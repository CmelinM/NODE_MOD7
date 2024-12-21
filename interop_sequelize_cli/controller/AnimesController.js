import * as db from '../models/index.cjs'

const { Anime } = db.default

const AnimesController = {}

AnimesController.create = async (req, res, next) => {
  const data = req.body

  try {
    const anime = await Anime.create(data)

    return res.json(anime)
  } catch (err) {
    console.error(err)

    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

AnimesController.getAllAnimes = async (req, res, next) => {
  try {
    const animes = await Anime.findAll();

    return res.json(animes);
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

AnimesController.delete = async (req, res, next) => {
  
}



export {
  AnimesController
}