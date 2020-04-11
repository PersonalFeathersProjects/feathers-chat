const { Service } = require('feathers-nedb');


const crypto = require('crypto')
const gravatarUrl = 'https://s.gravatar.com/avatar';
const query = "s=60"


exports.Users = class Users extends Service {
  

    create(data, params) {
        const { email, password, githubId, avatar } = data
        // console.log(data)
        
        const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');

        const gravatar = `${gravatarUrl}/${hash}/${query}`;

        const userData = {
            email,
            password,
            githubId,
            avatar: avatar === '' || null || undefined ? gravatar : avatar
        }


        return super.create(userData, params); 
    }
};
