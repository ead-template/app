export const getEnv = (key) => {
    console.log(process.env.NEXT_PUBLIC_HOST_API)
    console.log(process.env[key])
    return process.env[key]

}
