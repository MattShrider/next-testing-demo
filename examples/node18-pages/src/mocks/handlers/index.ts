// You can export global handlers here, and it is even recommended by the
// MSW team do do so. However in my experience that is a bad pattern. What
// ends up happening is mocks fall out of date, and you don't know what
// test is calling what mock file when. Eventually maintaining mocks
// becomes half the time spent completing a new feature.
//
// Additionally, you can't use these handlers if you want to assert that
// spies are called during tests. This is a massive downside, because
// many times that's actually the important part of the test. Otherwise
// you're just testing that mock data was returned in a certain shape.
//
// Finally, if we leave MSW unhandled calls as "errors" in the server
// configuration. MSW actually tells us when a test is making a network
// call that we didn't explicitely mock for the test. While this is annoying
// at first, it is useful to have to intentionally break tests if the server
// now makes new requests.
export const handlers = [];
