require('dotenv').config();
const mongoose = require('mongoose');
const mongo_URI = process.env.MONGO_URI;
mongoose.connect(mongo_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// to assign variables to other variables in .env, you have to use dotenv-expand
// otherwise, if you want to compose your varaibles, you have to concatenate the final variable in js, as .env by itself can only store raw strings.

let Person;

const personSchema = mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({
    name: 'John Doe',
    age: 25,
    favoriteFoods: ['chicken', 'fries']
  });
    
  person
    .save()
    .then((doc) => { done(null, doc);})
    .catch((err) => {console.log(err);});
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople)  
    .then((doc) => {done(null, doc);})
    .catch((err) => {console.log(err);});
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName})
    .then((doc) => {done(null, doc);})
    .catch((err) => { console.log(err);});
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food})
    .then((doc) => {done(null, doc);})
    .catch((err) => { console.log(err);});
};

const findPersonById = (personId, done) => {
  Person.findById(personId)
  .then((doc) => {done(null, doc);})
  .catch((err) => { console.log(err);});
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId)
    .then((doc) => {
      doc.favoriteFoods.push(foodToAdd);
      doc
        .save()
        .then((res) => {done(null, res);})
        .catch((err) => {console.log(err);})
    })
    .catch((err) => {console.log(err);});
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new:true})
  .then((doc) => {done(null, doc);})
  .catch((err) => { console.log(err);});
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId)
  .then((doc) => {done(null, doc);})
  .catch((err) => { console.log(err);});
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove})
  .then((doc) => {done(null, doc);})
  .catch((err) => { console.log(err);})
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({name:1})
    .limit(2)
    .select({age: 0})
    .exec()
      .then((doc) => {done(null, doc);})
      .catch((err) => { console.log(err);})
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;