export const getRestaurants = (): () => Promise<any> => async () => {
    let res;
    console.log(process.env.REACT_APP_API_KEY);
    await fetch(process.env.REACT_APP_API_KEY + "restaurants", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(async response => {
        if (!response.ok) {
            console.log("error");
        }
        console.log(response);
        return res = response.json();
    }).catch(err => {
        return err;
    })
    return res;
}