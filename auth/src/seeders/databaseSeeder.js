
import userSeeder from './userSeeder.js'


/**
 * Initiate the seeding process for various data collections in the database.
 * Calls multiple seeder functions for different collections.
 */
const databaseSeeder = () => {
    userSeeder()
}
export default databaseSeeder
