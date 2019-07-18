/*  @Doc
    Define an enum of authentication requirements types possible for the routes.
    When performing checks and running router gaurds, make sure to check against AuthType enum.

    Legend:
        public: User can access this route regardless of his/her current auth status.
        public_only: Only accessible if user is not logged in. Example would be the login route.
        private: Only accessible if user is currently authenticated.
*/
export default Object.freeze({
    "public": 1, "public_only": 2, "private": 3
});
