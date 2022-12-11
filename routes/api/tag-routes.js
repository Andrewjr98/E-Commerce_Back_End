const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll;
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id,{
      include: [{model: Tag, through: Tag, as: 'id'}]
    });
    if(!tagData){
      res.status(404).json({message: 'No tag found with this ID!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error)
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  const tagData = await Tag.update(
    {
      id: req.body.id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  return res.json(tagData);
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData){
      res.status(404).json({message: 'No category found with this ID'});
      return;
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
  // delete on tag by its `id` value
});

module.exports = router;
