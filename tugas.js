const express = require("express");
const { body, validationResult } = require("express-validator");
const Joi = require("joi");

const app = express();
const port = 4000;

app.use(express.json());

// Middleware untuk validasi input route menggunakan express-validator
const validateInput = [
 body('ibam1').isLength({ min: 5}).withMessage('Panjang username minimal 5 karakter'),
 body('bam@gmail.com').isEmail().withMessage('Format email tidak valid.'),
 body('ibam12345').isLength({ min: 8}).withMessage('Panjang password minimal 8 karakter'),
];

// Middleware untuk validasi input route menggunakan Joi
const validateInputJoi = (req, res, next) => {
 const schema = Joi.object({
  username: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
 });
 const { error } = schema.validate(req.body);
 if (error) {
  return res.status(400).json({ message: error.details[0].message });
 }
 next();
}

// Contoh route dengan validasi menggunakan express-validator
app.post('/user', validateInput, (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array()[0].msg });
 }
 // Pemrosesan data user
 res.json({ message: 'Data user valid!' });
});

// Contoh route dengan validasi menggunakan Joi
app.post('/user-joi', validateInputJoi, (req, res) => {
 // Pemrosesan data user
 res.json({ message: 'Data user valid!' });
})

app.listen(port, () => {
 console.log(`Server berjalan di http://localhost:${port}`);
});