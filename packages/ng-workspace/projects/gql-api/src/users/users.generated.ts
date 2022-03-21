import * as Types from '../types';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type ExampleQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ExampleQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', exampleField: number }> };

export const ExampleDocument = gql`
    query example {
  users {
    exampleField
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ExampleGQL extends Apollo.Query<ExampleQuery, ExampleQueryVariables> {
    document = ExampleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }