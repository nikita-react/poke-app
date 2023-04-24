import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import { DocumentNode } from "graphql";

type Variables = { [key: string]: any };

export const useGQLQuery = <T>(
  key: QueryKey,
  query: DocumentNode,
  variables?: Variables,
  config?: UseQueryOptions<T>
) => {
  const endpoint = "https://beta.pokeapi.co/graphql/v1beta";
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer token goes here`,
    },
  });

  const fetchData = async () => {
    return await graphQLClient.request<T>(query, variables);
  };

  return useQuery<T>(key, fetchData, config);
};
