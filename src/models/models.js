const shoes = require('../../db/climbingShoes')

const getAll = () => {
  return shoes
}

const getById = id => {
  const shoe = shoes.find(shoe => shoe.id == id);
  return shoe;
}

const makeNewShoe = (body) => {
  const model = body.model;
  const brand = body.brand;
  const errors = [];
  if (!model || !brand){
    errors.push("no can do!")
    response = {errors}
  }else{
    const bigShoe = {id: 23456 , model, brand};
    shoes.push(bigShoe)
    response = bigShoe;
  }
  return response;
}

const updateShoe = (id, body) => {
  const model = body.model;
  const upShoe = shoes.find(shoe => shoe.id == id)
  const brand = body.brand;
  const errors = [];
  if (!model || !brand){
    errors.push("no model or brand")
    response = {errors}
  }else{
    upShoe.model = model
    upShoe.brand = brand
    response = upShoe
  }
  return response
};

const deleteShoe = (id) => {
  const shoe = shoes.find(element => element.id == id)
  console.log(shoe);
  const errors = []
  if (!shoe){
    errors.push("Cant find shoe id")
    response = {errors}
  } else{
    const shoeGone =  shoes.splice(shoe,1)
    response = shoeGone
  }

  return response
}


module.exports = {
  getAll,
  getById,
  makeNewShoe,
  updateShoe,
  deleteShoe
}
