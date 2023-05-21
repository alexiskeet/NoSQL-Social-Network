const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userControllers');

router
.route('/')
.post(createUser)
.get(getUsers);

router
.route('/:userId')
.get(getSingleUser)
.delete(deleteUser)
.put(updateUser);

router
.route('/:userId/friends/:friendId')
.delete(removeFriend)
.post(addFriend);

module.exports = router;