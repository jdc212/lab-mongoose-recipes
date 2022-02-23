const mongoose = require('mongoose');
const express = require('express')
const router = express.Router();

const Recipe = require('../models/Recipe.model');

const data = require('../data.json');

// recipes/create-recipe
router.post('/create-posts', async (req, res) => {
    try{
        const newRecipe = await Recipe.create(req.body);

        return res.status(201).json(newRecipe)
        } catch (error) { 
            return res.status(500).json(error);
        }
})

router.post('/createMany-posts', async (req, res) => {
    try {
        const newRecipes = await Recipe.insertMany(data)
        console.log(newRecipes, 'console.log')
        return res.status(201).json(newRecipes)
    } catch (error) {
        return res.status(500).json(error);
    }
})

router.put('/update/:title/:duration', async (req,res) => {
    const {title, duration} = req.params

    try{
        const updateRecipe = await Recipe.findOneAndUpdate({title: title}, {duration: Number(duration)})
        return res.status(200).json(updateRecipe)
    } catch (error) { 
        return res.status(500).json(error);
    }
})

router.delete('/delete/:title', async (req, res) => {
    const {title} = req.params

    try {
        const deleteRecipe = await Recipe.deleteOne({tittle: title})
        return res.status(200).json(deleteRecipe);
    } catch (error) { 
        return res.status(500).json(error);
    }
})

module.exports = router