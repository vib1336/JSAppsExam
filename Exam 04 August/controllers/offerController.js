const offerController = function () {

    const getCreateOffer = function (context) {

        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;


        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial("../views/offers/createOffer.hbs")
        })
    };

    const postCreateOffer = function (context) {

        offerModel.createOffer(context.params)
            .then(helper.handler)
            .then(async () => {
                //homeController.getHome(context);
                
                const loggedIn = storage.getData('userInfo') !== null;

                if (loggedIn) {
                    const username = JSON.parse(storage.getData('userInfo')).username;
                    context.loggedIn = loggedIn;
                    context.username = username;



                    let response = await offerModel.getAllOffers();
                    let offers = await response.json();
                    
                    context.offers = offers;
                    
                    context.offers.forEach(offer => {

                        context['product'] = offer['product'];
                        context['description'] = offer['description'];
                        context['price'] = offer['price'];

                    })
                    
                }
                
                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs"
                }).then(function () {
                    this.partial("../views/dashboard/dashboardPage.hbs");
                })
            })
    };

    const getDashboardOffers = function (context) {
        offerModel.getAllOffers()
            .then(helper.handler)
            .then(data => {

                const loggedIn = storage.getData('userInfo') !== null;

                if (loggedIn) {
                    const username = JSON.parse(storage.getData('userInfo')).username;
                    context.loggedIn = loggedIn;
                    context.username = username;
                    context.offers = data;
                    
                }

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs"
                }).then(function () {
                    this.partial("../views/dashboard/dashboardPage.hbs");
                })

            })
    };

    const getOfferDetails = async function (context) {

        const loggedIn = storage.getData("userInfo") !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData("userInfo")).username;
            context.loggedIn = loggedIn;
            context.username = username;

            let response = await offerModel.getOffer(context.params.offerId);
            let offer = await response.json();

            Object.keys(offer)
                .forEach(key => {
                    context[key] = offer[key];
                })
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial("../views/details/detailsPage.hbs")
        })

    };

    const getDeleteOffer = async function (context) {

        const loggedIn = storage.getData("userInfo") !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData("userInfo")).username;
            context.loggedIn = loggedIn;
            context.username = username;

            let response = await offerModel.getOffer(context.params.offerId);
            let offer = await response.json();

            Object.keys(offer)
                .forEach(key => {
                    context[key] = offer[key];
                })
        }


        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial("../views/offers/deleteOffer.hbs")
        })


    };

    const postDeleteOffer = function (context){

        const loggedIn = storage.getData("userInfo") !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData("userInfo")).username;
            context.loggedIn = loggedIn;
            context.username = username;

        }

        offerModel.deleteOffer(context.params.offerId)
        .then(helper.handler)
        .then(async (data) => {
            
            let response = await offerModel.getAllOffers();
            let offers = await response.json();

            context.offers = offers;

            context.offers.forEach(offer => {

                context['product'] = offer['product'];
                context['description'] = offer['description'];
                context['price'] = offer['price'];

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs"
                }).then(function(){
                    this.partial("../views/dashboard/dashboardPage.hbs")
                })
            })
        })

        
    };

    const getEditOffer = async function (context) {

        const loggedIn = storage.getData("userInfo") !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData("userInfo")).username;
            context.loggedIn = loggedIn;
            context.username = username;

            let response = await offerModel.getOffer(context.params.offerId);
            let offer = await response.json();

            Object.keys(offer)
                .forEach(key => {
                    context[key] = offer[key];
                })

        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial("../views/offers/editOffer.hbs")
        })

    };

    const postEditOffer = function (context) {

        let offerId = context.params.offerId;
        delete context.params.offerId;

        let data = {
            ...context.params
        };

        const loggedIn = storage.getData("userInfo") !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData("userInfo")).username;
            context.username = username;
            context.loggedIn = loggedIn;
        }



        offerModel.editOffer(data, offerId)
            .then(helper.handler)
            .then(async (offer) => {
                let response = await offerModel.getAllOffers();
                let offers = await response.json();

                context.offers = offers;

                context.offers
                    .forEach(offer => {
                        context['product'] = offer['product'];
                        context['description'] = offer['description'];
                        context['price'] = offer['price'];
                    });

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs"
                }).then(function () {
                    this.partial("../views/dashboard/dashboardPage.hbs")
                })
            })

    };



    return {
        getCreateOffer,
        postCreateOffer,
        getDashboardOffers,
        getOfferDetails,
        getDeleteOffer,
        postDeleteOffer,
        getEditOffer,
        postEditOffer
    }
}();