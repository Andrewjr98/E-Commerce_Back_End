const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData= await Category.findAll;
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id,{
      include: [{model: Category, through: Product, as: 'category_id'}]
    });
    if(!categoryData){
      res.status(404).json({message:'No category found with this ID!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(400).json(error);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  const categoryData = await Category.update(
    {
      id: req.body.id,
    },
    {
      where: {
        category_id: req.params.category_id,
      },
    }
  );

  return res.json(categoryData);
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData){
      res.status(404).json({message: 'No category found with this ID'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
  // delete a category by its `id` value
});

module.exports = router;
