const debug = require('debug')('courseController')
const _ = require('lodash')
const StatusCodes = require('http-status-codes')
const mongoose = require('mongoose')

const Category = require('../models/Category')
const Course = require('../models/Course')
const { FAILED, SUCCESS } = require('../constants/constants')
const {
  secondsConverter,
  convertTimetoSecond,
  convertSecondsToTime,
} = require('../lib/utils')

exports.createCourse = async (req, res) => {
  try {
    const user = req.user
    const courseData = req.body
    const { category: category_name } = courseData
    // Finding categoryId
    const category = await Category.findOne({ name: category_name })
    if (!category) {
      throw new Error('Provided category does not exist')
    }
    const { _id: categoryId } = category

    // Convering time into seconds

    // Creating insert ready course
    const insertReadyCourse = {
      ...courseData,
      category: categoryId,
      owner: user._id,
    }
    const newCourse = new Course(insertReadyCourse)
    const insertedCourse = await newCourse.save()
    if (!insertedCourse) {
      throw new Error('Cannot create course')
    }
    res.status(201).send({ status: SUCCESS, course: insertedCourse })
  } catch (error) {
    res.status(500).send({ status: FAILED, error: error.message })
  }
}

exports.getSingleCourse = async (req, res) => {
  try {
    const { id } = req.params
    const course = await Course.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'courseCategory',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'courseOwner',
        },
      },
      {
        $project: {
          owner: 0,
          category: 0,
          'courseOwner.password': 0,
        },
      },
    ])

    course[0].availability.from = convertSecondsToTime(
      course[0].availability.from
    )
    course[0].availability.to = convertSecondsToTime(course[0].availability.to)
    if (course.length < 1) {
      throw new Error('Cannot find course', 404)
    }
    res.status(200).send({ status: SUCCESS, course })
  } catch (error) {
    res.status(500).send({ status: FAILED, error: error.message })
  }
}

exports.updateCourse = async (req, res) => {
  try {
    const { _id: userId } = req.user
    const { id: courseId } = req.params
    const { category: categoryName } = req.body
    const category = await Category.findOne({ name: categoryName })
    if (!category) {
      throw new Error('Provided category does not exist')
    }
    const { _id: categoryId } = category
    const updateReadyCourse = { ...req.body, category: categoryId }
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId, owner: userId },
      { $set: updateReadyCourse },
      { new: true }
    )

    if (!updatedCourse) {
      throw new Error('Cannot update Course')
    }
    res.status(200).send({ status: SUCCESS, updatedCourse })
  } catch (error) {
    res.status(500).send({ status: FAILED, error: error.message })
  }
}

exports.deleteCourse = async (req, res) => {
  try {
    const { id: courseId } = req.params
    const { _id: userId } = req.user
    const deletedCourse = await Course.findOneAndDelete({
      _id: courseId,
      owner: userId,
    })
    if (!deletedCourse) {
      throw new Error('Cannot delete course')
    }
    res.status(200).send({ status: SUCCESS, deletedCourse })
  } catch (error) {
    res.status(500).send({ status: FAILED, error: error.message })
  }
}

exports.getCourses = async (req, res) => {
  const { _id: userId } = req.user
  const { limit, skip, sortBy } = req.query
  console.log({ limit, skip })
  const sort = {}
  if (sortBy) {
    const parts = sortBy.split('_')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  const isSortEmpty = _.isEmpty(sort)
  if (isSortEmpty) {
    sort._id = 1
  }

  try {
    const courses = await Course.aggregate([
      { $match: { owner: userId } },
      {
        $sort: sort,
      },
      { $skip: skip ? +skip : 0 },
      { $limit: limit ? +limit : 20 },
    ])

    res.status(200).send({ status: SUCCESS, courses })
  } catch (error) {
    res.status(500).send({ status: FAILED, error: error.message })
  }
}

exports.getAllCourses = async (req, res) => {
  const { sortBy, limit, skip } = req.query
  const sort = {}
  if (sortBy) {
    const parts = sortBy.split('_')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }
  const isSortEmpty = _.isEmpty(sort)
  if (isSortEmpty) {
    sort._id = 1
  }

  try {
    const courses = await Course.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'creator',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'courseCategory',
        },
      },

      {
        $sort: sort,
      },
      { $skip: skip ? +skip : 0 },
      { $limit: limit ? +limit : 20 },
      {
        $project: {
          owner: 0,
          category: 0,
          'creator.password': 0,
        },
      },
    ])

    courses.forEach((course) => {
      course.availability.from = convertSecondsToTime(course.availability.from)
      course.availability.to = convertSecondsToTime(course.availability.to)
    })

    res.status(200).send({ courses })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

exports.filterByCategory = async (req, res) => {
  try {
    const { cat, limit, skip } = req.query
    const category = await Category.findOne({ name: cat })
    if (!category) {
      throw new Error(`Category:${cat} not found`)
    }
    const { _id: categoryId } = category
    const courses = await Course.aggregate([
      {
        $match: { category: categoryId },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'courseCategory',
        },
      },
      { $skip: skip ? +skip : 0 },
      { $limit: limit ? +limit : 20 },
      { $project: { category: 0 } },
    ])
    res.status(200).send({ status: SUCCESS, courses })
  } catch (error) {
    res.status(500).send({ status: FAILED, error: error.message })
  }
}

exports.enrollRequest = async (req, res) => {
  try {
    const { _id: userId } = req.user
    const { id: courseId } = req.params

    const appliedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      { $addToSet: { students: { _id: userId, enrolled_status: 'pending' } } },
      { new: true }
    )
    if (!appliedCourse) {
      throw new Error('Cannot send enroll request')
    }
    res.status(200).send({ status: SUCCESS })
  } catch (error) {
    res.status(500).send({ status: FAILED, error: error.message })
  }
}

exports.enrollDecide = async (req, res) => {
  try {
    const { _id: ownerId } = req.user
    const { courseId, studentId, status } = req.body
    const approvedCourse = await Course.updateOne(
      {
        _id: courseId,
        owner: ownerId,
        students: {
          $elemMatch: { _id: studentId, enrolled_status: 'pending' },
        },
      },
      {
        $set: { 'students.$.enrolled_status': status },
      }
    )
    console.log({ approvedCourse })
    if (approvedCourse.modifiedCount !== 1) {
      throw new Error('Cannot change student status')
    }
    res.status(200).send({ status: SUCCESS })
  } catch (error) {
    res.status(500).send({ status: FAILED, error: error.message })
  }
}

// TODO:Enroll pending to cancel by student
// exports.enrollCancel

exports.getEnrolledCourses = async (req, res) => {
  try {
    const { limit, skip } = req.query
    const { _id: studentId } = req.user
    const courses = await Course.aggregate([
      {
        $match: {
          'students._id': mongoose.Types.ObjectId(studentId),
          'students.enrolled_status': 'accepted',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'courseCategory',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$courseCategory', 0] }, '$$ROOT'],
          },
        },
      },

      { $project: { category: 0 } },
      {
        $project: {
          category: '$name',
          title: 1,
          description: 1,
          capacity: 1,
          availability: 1,
          length: 1,
          owner: 1,
          students: 1,
          // courseCategory: 1,
        },
      },
      {
        $skip: skip ? +skip : 0,
      },
      { $limit: limit ? +limit : 20 },
    ])

    res.status(200).send({ status: SUCCESS, courses })
  } catch (error) {
    res.status(500).send({ status: FAILED, error: error.message })
  }
}
// TODO:student capacity exceed bhayo bhane dina bhayena
