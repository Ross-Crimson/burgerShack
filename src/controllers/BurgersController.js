import { burgersService } from "../services/BurgersService.js";
import BaseController from "../utils/BaseController.js";



export class BurgersController extends BaseController {
    constructor() {
        super('api/burgers')
        //this.router.get('/test', this.testBurgers)
        this.router.get('', this.GetBurgers)
        this.router.post('', this.CreateBurger)
        this.router.delete('/:burgerId', this.DeleteBurger)
        this.router.put('/:burgerId', this.UpdateBurger)
    }

    testBurgers(request, response, next) {
        console.log('🍔')
        response.send('got a burg')
    }

    async GetBurgers(request, response, next) {
        try {
            const burgers = await burgersService.GetBurgers()
            response.send(burgers)
        } catch (error) {
            next(error)
        }
    }

    async CreateBurger(request, response, next) {
        try {
            const burgerData = request.body
            const burger = await burgersService.CreateBurger(burgerData)
            response.send(burger)
        } catch (error) {
            next(error)
        }
    }

    async DeleteBurger(request, response, next) {
        try {
            const burgerId = request.params.burgerId
            await burgersService.DeleteBurger(burgerId)
            response.send("Burger was Removed")
        } catch (error) {
            next(error)
        }
    }

    async UpdateBurger(request, response, next) {
        try {
            const burgerId = request.params.burgerId
            const burgerData = request.body
            await burgersService.UpdateBurger(burgerId, burgerData)
            response.send(`${burgerData.name} was Updated to $ ${burgerData.price}`)
        } catch (error) {
            next(error)
        }
    }
}