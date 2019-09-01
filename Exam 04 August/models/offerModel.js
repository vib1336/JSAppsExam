const offerModel = function(){

    const createOffer = function(params){
        let data = {
            ...params
        };
        
        let url = `/appdata/${storage.appKey}/offers`;

        let headers = {
            body: JSON.stringify(data),
            headers: {}
        };

        return requester.post(url, headers);
    };

    //getAllOffers?

    const getAllOffers = function(){

        let url = `/appdata/${storage.appKey}/offers`;

        let headers = {
            headers:{}
        };

        return requester.get(url, headers);
    };

    const getOffer = function(id){
        let url = `/appdata/${storage.appKey}/offers/${id}`;

        let headers = {
            headers:{}
        };

        return requester.get(url, headers);
    };

    const editOffer = function(data, id){

        let url = `/appdata/${storage.appKey}/offers/${id}`;

        let headers = {
            body: JSON.stringify(data),
            headers:{}
        };

        return requester.put(url, headers);
    };

    const deleteOffer = function(id){

        let url = `/appdata/${storage.appKey}/offers/${id} `;

        let headers = {
            headers: {}
        };

        return requester.del(url, headers);
    };
    

    

    return {
        createOffer,
        getAllOffers,
        getOffer,
        editOffer,
        deleteOffer
    }
}();