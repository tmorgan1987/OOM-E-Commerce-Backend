const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
	Tag.findAll({
		include: [
			{
				model: Product,
				through: ProductTag,
			}
		]})
		.then((tagData) => {
		res.json(tagData);
	});
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
	Tag.findOne({
		where: {
			id: req.params.id
		},
		include: [
			{
				model: Product,
				through: ProductTag,
			}
		]
	}).then((tagIdData) => {
		res.json(tagIdData);
	})
});

router.post('/', (req, res) => {
  Tag.create(req.body)
	.then((newTag) => {
		res.json(newTag);
	})
	.catch((err) => {
		res.json(err);
	});
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
	Tag.update(
		{
		id: req.body.id,
		name: req.body.name,
		},
		{
			where: {
				id: req.body.id,
			},
		}
	)
	.then((updatedTag) => {
		res.json(updatedTag);
	})
	.catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
	Tag.destroy({
		where: {
			id: req.body.id,
		},
	})
	.then((deletedTag) => {
		res.json(deletedTag);
	})
	.catch((err) => res.json(err));
});

module.exports = router;
