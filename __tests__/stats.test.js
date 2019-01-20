global.fetch = require(`isomorphic-fetch`); // used to polyfill fetch in jest (nodejs)
global.FormData = require(`form-data`); // used to polyfill FormData in jest (nodejs)

import statsApi from '../src/js/lib/api/stats';

/*
 Use these tests on a stats table which has at least 4 records with these created dates:

 2017-01-01 08:00:00
 2017-03-15 08:00:00
 2017-03-15 15:00:00
 2017-03-24 00:00:00

 adjust the validStatsObjectToInsert to an object with all the required properties
 this object should be valid for insertion through php
 if you have additional properties which are validated through PHP (e.g. "timesClicked"),
 adjust the object below e.g:
 const validStatsObjectToInsert = {
   duration: 123,
   timesClicked: 10
 };
*/

const validStatsObjectToInsert = {
  duration: 123,
};

describe(`Stats API`, () => {
  describe(`select()`, () => {
    it(`has a function called select`, () => {
      expect(statsApi.select).toBeDefined();
    });
    it(`returns an array through a promise`, () => {
      return statsApi.select()
        .then(stats => {
          expect(Array.isArray(stats)).toBe(true);
        });
    });
    it(`takes from & to filters into account`, () => {
      const from = `2017-03-14`,
        to = `2017-03-16`,
        fromDate = new Date(from),
        toDate = new Date(to);
      return statsApi.select({
        from,
        to,
      })
        .then(stats => {
          // check if there are not stats before or after the given parameters
          stats.forEach(o => {
            const date = new Date(o.date);
            expect(date.getTime()).toBeGreaterThanOrEqual(fromDate.getTime());
            expect(date.getTime()).toBeLessThanOrEqual(toDate.getTime());
          });
        });
    });
    it(`takes just a from filter into account`, () => {
      const from = `2017-03-14`,
        fromDate = new Date(from);
      return statsApi.select({
        from,
      })
        .then(stats => {
          // check if there are not stats before or after the given parameters
          stats.forEach(o => {
            const date = new Date(o.date);
            expect(date.getTime()).toBeGreaterThanOrEqual(fromDate.getTime());
          });
        });
    });
    it(`takes just a to filter into account`, () => {
      const to = `2017-03-16`,
        toDate = new Date(to);
      return statsApi.select({
        to,
      })
        .then(stats => {
          // check if there are not stats before or after the given parameters
          stats.forEach(o => {
            const date = new Date(o.date);
            expect(date.getTime()).toBeLessThanOrEqual(toDate.getTime());
          });
        });
    });
    it(`takes the time-part into account for a date`, () => {
      const from = `2017-03-15 08:00:00`,
        to = `2017-03-15 09:00:00`,
        fromDate = new Date(from),
        toDate = new Date(to);
      return statsApi.select({
        from,
        to,
      })
        .then(stats => {
          // check if there are not stats before or after the given parameters
          stats.forEach(o => {
            const date = new Date(o.date);
            expect(date.getTime()).toBeGreaterThanOrEqual(fromDate.getTime());
            expect(date.getTime()).toBeLessThanOrEqual(toDate.getTime());
          });
        });
    });
  });
  describe(`create()`, () => {
    it(`has a function called insert`, () => {
      expect(statsApi.insert).toBeDefined();
    });
    it(`returns a result through a promise`, () => {
      return statsApi.insert()
        .then(result => {
          expect(result).toBeDefined();
          expect(result.result).toBeDefined();
        });
    });
    it(`returns a validation error when not passing any parameters`, () => {
      return statsApi.insert()
        .then(result => {
          expect(result.result).toBe(`error`);
          expect(result.errors).toBeDefined();
          expect(result.errors.duration).toBeDefined();
        });
    });
    it(`returns a validation error when passing an empty object`, () => {
      return statsApi.insert({})
        .then(result => {
          expect(result.result).toBe(`error`);
          expect(result.errors).toBeDefined();
          expect(result.errors.duration).toBeDefined();
        });
    });
    it(`inserts a new database record when passing a valid object`, () => {
      return statsApi.insert(validStatsObjectToInsert)
        .then(result => {
          console.log(result);
          expect(result.result).toBe(`ok`);
          expect(result.stats).toBeDefined();
          expect(result.stats.duration).toBe(validStatsObjectToInsert.duration);
        });
    });
  });
});
