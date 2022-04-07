
const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json()); //allow json body to be used on post 

const courses = [
    { id: 1, name: "Course 1" },
    { id: 3, name: "Course 3" },
    { id: 2, name: "Course 2" }
];

app.get('/', (req, res) => {
    res.send("hello world !!");
});

app.get('/api/courses', (req, res) => {
    res.send(JSON.stringify(courses));
})

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the given ID was not found");
    res.send(course);
})

app.post('/api/courses/', (req, res) => {
    //const results = validateCourse(req.body);
    const { error } = validateCourse(req.body); // this is { error } the same as this results.error
    if (error) return res.status(400).send(error.details[0].message)

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    //look up the course, if not exist, send 404 not found 
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the given ID was not found");

    //const results = validateCourse(req.body);
    const { error } = validateCourse(req.body); // this is { error } the same as this results.error
    if (error) return res.status(400).send(error.details[0].message)

    //else update course and return the updated one
    course.name = req.body.name;

    res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
    //look for the course, if not exist send back 404 not found 
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the given ID was not found");

    //delete the course
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //return the course name
    res.send(course);

})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}


// multiple params with query string 
// e.g. /api/post/2022/2/sortBy=names // that is, get the posts in year 2022, month 2, sort them by their names 
// app.get('/api/posts/:year/:month', (req, res) => {
//    res.send(req.query);
// })

const port = process.env.port || 3002;
app.listen(port, console.log(`Listening on port ${port}`));
