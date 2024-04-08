import { dbContext } from "../db/DbContext.js";

class BurgersService {
    async GetBurgers() {
        const burgers = await dbContext.Burgers.find()

        return burgers
    }

    async CreateBurger(burgerData) {
        const burger = await dbContext.Burgers.create(burgerData)
        return burger
    }

    async DeleteBurger(burgerId) {
        const burgerToRemove = await dbContext.Burgers.findById(burgerId)

        if (!burgerToRemove) throw new Error(`burger already removed${burgerId}`)

        await dbContext.Burgers.deleteOne({ _id: burgerId })
    }

    async UpdateBurger(burgerId, burgerData) {
        const burgerToUpdate = await dbContext.Burgers.findById(burgerId)

        if (!burgerToUpdate) throw new Error(`burger ${burgerId} doesn't exist`)

        return await dbContext.Burgers.updateOne({ _id: burgerId }, burgerData)
    }
}

export const burgersService = new BurgersService()