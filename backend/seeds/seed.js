const { faker } = require("@faker-js/faker");

function createFakeUser() {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        image: faker.image.avatar(),
        color: faker.internet.color(),
    };
}

function createFakeProject() {
    return {
        name: faker.word.noun(),
        description: faker.lorem.sentence(),
        image: faker.image.urlLoremFlickr(),
    };
}

function createFakeCategory(projectId) {
    return {
        projectId,
        type: "TODO",
        name: faker.word.noun(),
        order: faker.number.int(),
    };
}

function createFakePriority() {
    return {
        name: faker.word.noun(),
        order: faker.number.int(),
    };
}

function createFakeIssue(categoryId, reporterId, assigneeId, priorityId) {
    return {
        categoryId,
        name: faker.word.noun(),
        description: faker.lorem.sentence(),
        reporterId,
        assigneeId,
        priorityId,
    };
}

function createFakeComment(issueId, userId) {
    return {
        issueId,
        userId,
        content: faker.lorem.paragraph(),
    };
}

exports.seed = async function (knex) {
    // Deletes existing entries
    await knex("Comment").del();
    await knex("Issue").del();
    await knex("Priority").del();
    await knex("Category").del();
    await knex("Project").del();
    await knex("User").del();

    // Inserts seed entries
    const users = await knex("User")
        .insert(Array(10).fill().map(createFakeUser))
        .returning("id");
    const projects = await knex("Project")
        .insert(Array(5).fill().map(createFakeProject))
        .returning("id");
    const categories = await knex("Category").insert(
        Array(10)
            .fill()
            .map((_, index) =>
                createFakeCategory(projects[index % projects.length])
            )
    );
    const priorities = await knex("Priority").insert(
        Array(5).fill().map(createFakePriority)
    );
    const issues = await knex("Issue").insert(
        Array(20)
            .fill()
            .map((_, index) =>
                createFakeIssue(
                    categories[index % categories.length],
                    users[index % users.length],
                    users[(index + 1) % users.length],
                    priorities[index % priorities.length]
                )
            )
    );
    await knex("Comment").insert(
        Array(30)
            .fill()
            .map((_, index) =>
                createFakeComment(
                    issues[index % issues.length],
                    users[index % users.length]
                )
            )
    );
};
