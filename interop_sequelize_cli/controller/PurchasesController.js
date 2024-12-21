import * as db from "../models/index.cjs"

const  { Purchase, Anime, sequelize } = db.default;

const PurchasesController = {}

// PurchasesController.create = async (req, res, next)  => {
//   const data = req.body;
//   const { AnimeId } = data
//   const t = await sequelize.transaction()
//   try {
//     /**
//      * Dentro de transaccion
//      */
//     const purchase = await Purchase.create(
//       data,
//       { transaction: t }
//     );

//     // Disminuimos anime en 1
//     const anime = await Anime.findOne( { where: { id: AnimeId } } )
//     anime.stock -= 1
//     await anime.save({ transaction: t })

//     // Persistimos
//     await t.commit();

//     return res.json(purchase);
//   } catch (err) {
//     console.error(err);
//     await t.rollback();
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }

PurchasesController.create = async (req, res, next) => {
  const data = req.body

  try {
    const purchase = await Purchase.createOrder(data) // Hacemos compra

    return res.json(purchase)
  } catch (err) {
    if(err?.cause == 'INVALID_RECORD') {
      return res.status(404).json({message: err.message})
    }

    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export { PurchasesController }
