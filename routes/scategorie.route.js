const express = require('express');
const router = express.Router();
const Scategorie = require("../models/scategorie")

// créer un nouvelle scatégorie
router.post('/', async (req, res) => {
    const { nomscategorie, imagescat, categorieID } = req.body;
    const newScategorie = new Scategorie({
        nomscategorie: nomscategorie,
        imagescat: imagescat,
        categorieID: categorieID
    })
    try {
        await newScategorie.save();
        res.status(200).json(newScategorie);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// afficher la liste des scategories.
router.get('/', async (req, res) => {
    try {
        const cat = await Scategorie.find({}, null, {
            sort: { '_id': -1 }
        }).populate("categorieID").exec();
        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// chercher une scatégorie
router.get('/:scategorieId', async (req, res) => {
    try {
        const cat = await Scategorie.findById(req.params.scategorieId);
        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Supprimer une scatégorie
router.delete('/:scategorieId', async (req, res) => {
    const id = req.params.scategorieId;
    try {
        await Scategorie.findByIdAndDelete(id);
        res.json({ message: "Scategorie deleted successfully." });
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
});

// modifier une scatégorie
router.put('/:scategorieId', async (req, res) => {
    try {
        const cat1 = await Scategorie.findByIdAndUpdate(
            req.params.scategorieId,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(cat1);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


module.exports = router   