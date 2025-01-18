const mongoose = require('mongoose');
const mongooseSequence = require('mongoose-sequence')(mongoose); 

const itemSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required:[true,  'Meal name is required'],
        minlength: [3, 'Meal name must be at least 3 characters'], 
        maxlength: [100, 'Meal name cannot exceed 100 characters']

     },
    price: { 
        type: Number,
        required: [true,'Price is required'], 
        min: [0, 'Price must be a positive number'], 
        validate: {
            validator: function(value) {
                return !isNaN(value) && value > 0;
            },
            message: 'Price must be a valid number greater than 0'
        }
    },
    photo: { 
        type: String, 
        default: '',
        validate: {
            validator: function(value) {
                
                return value === '' || /^(http(s?):\/\/[^\s$.?#].[^\s]*$)/.test(value);
            },
            message: 'Photo URL must be a valid image URL'
        }
    },
    id: { 
        type: Number, 
        unique: true 
    }  
});


itemSchema.plugin(mongooseSequence, {
    inc_field: 'id', 
    start_seq: 1      
});

module.exports = mongoose.model('Item', itemSchema);
