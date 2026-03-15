const express = require('express');
const router = express.Router();
const Alarm = require('../models/Alarm');

// GET /api/alarms - отримати всі будильники
router.get('/', async (req, res) => {
    try {
        const alarms = await Alarm.find();
        res.json(alarms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/alarms - створити новий будильник
router.post('/', async (req, res) => {
    try {
        const alarm = new Alarm({
            label: req.body.label,
            time: req.body.time
        });
        const newAlarm = await alarm.save();
        res.status(201).json(newAlarm);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/alarms/:id - видалити будильник
router.delete('/:id', async (req, res) => {
    try {
        await Alarm.findByIdAndDelete(req.params.id);
        res.json({ message: 'Будильник видалено' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH /api/alarms/:id - вмикити/вимкнути будильник
router.patch('/:id', async (req, res) => {
    try {
        const alarm = await Alarm.findById(req.params.id);
        alarm.isActive = !alarm.isActive;
        await alarm.save();
        res.json(alarm);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;