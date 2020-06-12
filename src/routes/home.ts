// const router = require('express').Router()
import express from 'express'
import HomeController from '../controllers/home'

const Router = express.Router()

Router.get('/',HomeController.home)
Router.get('/:page',HomeController.home)

export default Router