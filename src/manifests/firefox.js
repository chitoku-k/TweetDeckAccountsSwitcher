export default Object.assign(
    require("./common").default,
    {
        applications: {
            gecko: {
                id: process.env.FIREFOX_APPLICATION_ID,
            },
        },
    }
)
