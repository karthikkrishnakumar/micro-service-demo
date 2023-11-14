
import postSeeder from './postSeeder.js'


/**
 * Initiate the seeding process for various data collections in the database.
 * Calls multiple seeder functions for different collections.
 */
const databaseSeeder = () => {
    postSeeder()
}
export default databaseSeeder
