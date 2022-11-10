const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
	try {
		let categories = await Category.findAll({
			include: [{ model: Product}]
		});
		res.status(200).json(categories);
	} catch(err){
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
	try {
		let oneCategory = await Category.findByPk(req.params.id, {
			include: [{ model: Product}]
		});
		if (oneCategory === null){
			res.status(400).json("The identification number isn't valid.");
		} else {
			res.status(200).json(oneCategory);
		} 
		}
			catch (err){
			res.status(500).json(err);
		}
});

router.post('/', async (req, res) => {
  // create a new category
	console.log(req.body);
	try {
		const newCategory = await Category.create(req.body);
		res.status(200).json(newCategory);
	} catch (err) {
		res.status(500).json(err)
	}
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
	Category.update(
		{
			id: req.body.id,
			category_name: req.body.category_name,
		},
		{
			where: {
				id: req.body.id,
			},
		}
	)
	.then((updatedCategory) => {
		res.json(updatedCategory);
	})
	.catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
	Category.destroy({
		where: {
			id: req.params.id,
		},
	})
	.then((deletedCategory) => {
		res.json(deletedCategory);
	})
});

module.exports = router;
