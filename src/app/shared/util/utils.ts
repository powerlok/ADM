import { Injectable } from "@angular/core";

@Injectable()
export class Utils {

    guidId(){
        let id: string = '_' + Math.random().toString(36).substr(2, 9);
        return id;
    }

    getParsedObjectWithUpperCaseKeys(jsonObject) {
      var parsedObjectWithUpperCaseKeys = {};

      Object.keys(jsonObject).forEach(function (jsonObjectKey) {
        console.log(jsonObjectKey);
          parsedObjectWithUpperCaseKeys [jsonObjectKey.toUpperCase()] = jsonObject[jsonObjectKey];
      });

      return parsedObjectWithUpperCaseKeys;
  }
}
