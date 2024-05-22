const express = require("express")
const Event = require("./models/event.model")
const Users = require("./models/users.model")
const router = express.Router()

router.get("/events", async (req, res) => {
	const events = await Event.find()
	res.send(events)
})

router.post("/events/create", async (req, res) => {
    try {
        const event = new Event({
            Title: req.body.Title,
            Description: req.body.Description,
            StartTime: req.body.StartTime,
            EndTime: req.body.EndTime,
            LocationLink: req.body.LocationLink
        });
        await event.save();
        res.status(201).send(event);
    } catch (error) {
        res.status(500).send({ error: error.message }); 
    }
});

router.delete("/events/delete/:id", async (req, res) => {
	try {
		await Event.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Event doesn't exist!" })
	}
})

router.patch("/events/edit/:id", async (req, res) => {
	try {
		const event = await Event.findOne({ _id: req.params.id })

		if (req.body.Title) {
			event.Title = req.body.Title
		}

		if (req.body.Description) {
			event.Description = req.body.Description
		}

        if (req.body.StartTime) {
			event.StartTime = req.body.StartTime
		}

		if (req.body.EndTime) {
			event.EndTime = req.body.EndTime
		}

        if (req.body.LocationLink) {
			event.LocationLink = req.body.LocationLink
		}

		await event.save()
		res.send(event)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

router.post("/login",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check = await Users.findOne({Email:email})

        if(check?.Role == "Admin"){
            res.json("admin")
        }
		else if (check?.Role == "User"){
            res.json("user")
        }
        else{
            res.json("invalid")
        }

    }
    catch(e){
        res.json("fail")
    }

})
module.exports = router;


