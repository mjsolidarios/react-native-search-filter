import faker from 'faker'

const data = []
const count = 200

let range = n => Array.from(Array(n).keys())

for(i in range(count)){
    data.push({
        id: faker.random.uuid(),
        user: {
            name: faker.name.firstName()
        },
        subject: faker.lorem.words(5)
    })
}

export default data