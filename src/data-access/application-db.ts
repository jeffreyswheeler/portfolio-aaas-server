export default function makeAppDb({ makeDb }: { makeDb: any }) {
    return Object.freeze({
        findByName,
        findById,
        insert,
        list
    });

    async function findByName(appName: string) {
        const db = await makeDb();
        const query = { appName };
        const result = await db.collection('applications').find(query).toArray();

        return result[0];
    }

    async function findById(id: string) {
        // console.log(userId)
        const db = await makeDb();
        const query = { _id: { $eq: id } };
        const result = await db.collection('applications').find(query).toArray();

        return result[0];
    }

    async function insert(newProject: any) {
        const db = await makeDb();
        const result = await db.collection('applications').insertOne(newProject);
        const projectAdded = result.acknowledged;
        return projectAdded;
    }

    async function list() {
        const db = await makeDb();
        const result = await db.collection('applications').find().toArray();

        return result;
    }
}
