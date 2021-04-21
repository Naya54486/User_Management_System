var Userdb = require('../model/model')

// Create
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({message: "Content cannot be empty!!"});
        return;
    }

    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // save user in DB
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating user"
            });
        });

}


// Update user by ID
exports.update = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({message: "Data to be updated cannot be empty!!"});
        return;
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if (!data) {
            res.status(404).send({message: `Cannot update user with ${id}. Maybe user not found`})
        } else {
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({message: "Error update user information"})
    })
}


// Delete user by ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data => {
        if (!data) {
            res.status(404).send({message: `Cannot delete user with ${id}. Maybe id is wrong`})
        } else {
            res.send({message: "User was deleted successfully!!"})
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete user with id = " + id
        });
    });
}


//Get All/ Get One
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Userdb.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({message: `Not found user with id = ${id}`})
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Cannot get user with id = ${id}`
            })
        })

    } else {
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error getting user"})
        }) 
    }


}
