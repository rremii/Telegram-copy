module.exports = class UserDto {
    email

    user_id

    constructor(model) {
        this.user_id = model.user_id
        this.email = model.email
    }

}