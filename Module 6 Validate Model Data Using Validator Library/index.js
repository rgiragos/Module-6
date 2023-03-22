const authorSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    email: {
    type: String,
    required: true,
    unique: true,
    validate: {
    validator: (value) => /^[\w-\ • ]+@([\w-]+\.)+[\w-]{2,4}$/.test(value), 
    message: (props) => `${props.value} is not a valid email address`,
    },
},
    age: {type: Number, required: true, min: 18, max: 120 },
});

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: authorSchema,
pages: { type: Number, required: true, min: 1 },
publicationDate: {
type: Date,
required: true,
    validate: {
    validator: (value) => value <= Date.now(), 
    message: 'Publication date must be in the past',
    },
},
price:{
type: Number,
required: true,
min: 0,
max: 1000,
},
format: {
type: String,
enum: ['hardcover', 'paperback', 'ebook'],
required: true,
},
});