/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { Configuration } from "./configuration";
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from "axios";
import globalAxios from "axios";
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from "./common";
import type { RequestArgs } from "./base";
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  BaseAPI,
  RequiredError,
  operationServerMap,
} from "./base";

/**
 *
 * @export
 * @interface CollectionModelEntityModelDockerService
 */
export interface CollectionModelEntityModelDockerService {
  /**
   *
   * @type {CollectionModelEntityModelDockerServiceEmbedded}
   * @memberof CollectionModelEntityModelDockerService
   */
  _embedded?: CollectionModelEntityModelDockerServiceEmbedded;
  /**
   *
   * @type {{ [key: string]: Link; }}
   * @memberof CollectionModelEntityModelDockerService
   */
  _links?: { [key: string]: Link };
}
/**
 *
 * @export
 * @interface CollectionModelEntityModelDockerServiceEmbedded
 */
export interface CollectionModelEntityModelDockerServiceEmbedded {
  /**
   *
   * @type {Array<EntityModelDockerService>}
   * @memberof CollectionModelEntityModelDockerServiceEmbedded
   */
  dockerServiceList?: Array<EntityModelDockerService>;
}
/**
 *
 * @export
 * @interface EntityModelDockerLogs
 */
export interface EntityModelDockerLogs {
  /**
   *
   * @type {string}
   * @memberof EntityModelDockerLogs
   */
  logs?: string;
  /**
   *
   * @type {{ [key: string]: Link; }}
   * @memberof EntityModelDockerLogs
   */
  _links?: { [key: string]: Link };
}
/**
 *
 * @export
 * @interface EntityModelDockerService
 */
export interface EntityModelDockerService {
  /**
   *
   * @type {Array<string>}
   * @memberof EntityModelDockerService
   */
  names?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof EntityModelDockerService
   */
  image?: string;
  /**
   *
   * @type {string}
   * @memberof EntityModelDockerService
   */
  status?: string;
  /**
   *
   * @type {string}
   * @memberof EntityModelDockerService
   */
  id?: string;
  /**
   *
   * @type {Array<PortMapping>}
   * @memberof EntityModelDockerService
   */
  ports?: Array<PortMapping>;
  /**
   *
   * @type {number}
   * @memberof EntityModelDockerService
   */
  createdAt?: number;
  /**
   *
   * @type {{ [key: string]: Link; }}
   * @memberof EntityModelDockerService
   */
  _links?: { [key: string]: Link };
}
/**
 *
 * @export
 * @interface Link
 */
export interface Link {
  /**
   *
   * @type {string}
   * @memberof Link
   */
  href?: string;
  /**
   *
   * @type {string}
   * @memberof Link
   */
  hreflang?: string;
  /**
   *
   * @type {string}
   * @memberof Link
   */
  title?: string;
  /**
   *
   * @type {string}
   * @memberof Link
   */
  type?: string;
  /**
   *
   * @type {string}
   * @memberof Link
   */
  deprecation?: string;
  /**
   *
   * @type {string}
   * @memberof Link
   */
  profile?: string;
  /**
   *
   * @type {string}
   * @memberof Link
   */
  name?: string;
  /**
   *
   * @type {boolean}
   * @memberof Link
   */
  templated?: boolean;
}
/**
 *
 * @export
 * @interface PortMapping
 */
export interface PortMapping {
  /**
   *
   * @type {string}
   * @memberof PortMapping
   */
  ip?: string;
  /**
   *
   * @type {number}
   * @memberof PortMapping
   */
  privatePort?: number;
  /**
   *
   * @type {number}
   * @memberof PortMapping
   */
  publicPort?: number;
  /**
   *
   * @type {string}
   * @memberof PortMapping
   */
  type?: string;
}

/**
 * DockerServicesControllerApi - axios parameter creator
 * @export
 */
export const DockerServicesControllerApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    all: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/api/services`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    logs: async (
      id: string,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists("logs", "id", id);
      const localVarPath = `/api/services/{id}/logs`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(id)),
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    one: async (
      id: string,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists("one", "id", id);
      const localVarPath = `/api/services/{id}`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(id)),
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * DockerServicesControllerApi - functional programming interface
 * @export
 */
export const DockerServicesControllerApiFp = function (
  configuration?: Configuration,
) {
  const localVarAxiosParamCreator =
    DockerServicesControllerApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async all(
      options?: RawAxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<CollectionModelEntityModelDockerService>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.all(options);
      const index = configuration?.serverIndex ?? 0;
      const operationBasePath =
        operationServerMap["DockerServicesControllerApi.all"]?.[index]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, operationBasePath || basePath);
    },
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async logs(
      id: string,
      options?: RawAxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<EntityModelDockerLogs>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.logs(
        id,
        options,
      );
      const index = configuration?.serverIndex ?? 0;
      const operationBasePath =
        operationServerMap["DockerServicesControllerApi.logs"]?.[index]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, operationBasePath || basePath);
    },
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async one(
      id: string,
      options?: RawAxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<EntityModelDockerService>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.one(
        id,
        options,
      );
      const index = configuration?.serverIndex ?? 0;
      const operationBasePath =
        operationServerMap["DockerServicesControllerApi.one"]?.[index]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, operationBasePath || basePath);
    },
  };
};

/**
 * DockerServicesControllerApi - factory interface
 * @export
 */
export const DockerServicesControllerApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  const localVarFp = DockerServicesControllerApiFp(configuration);
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    all(options?: any): AxiosPromise<CollectionModelEntityModelDockerService> {
      return localVarFp
        .all(options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    logs(id: string, options?: any): AxiosPromise<EntityModelDockerLogs> {
      return localVarFp
        .logs(id, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    one(id: string, options?: any): AxiosPromise<EntityModelDockerService> {
      return localVarFp
        .one(id, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * DockerServicesControllerApi - object-oriented interface
 * @export
 * @class DockerServicesControllerApi
 * @extends {BaseAPI}
 */
export class DockerServicesControllerApi extends BaseAPI {
  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DockerServicesControllerApi
   */
  public all(options?: RawAxiosRequestConfig) {
    return DockerServicesControllerApiFp(this.configuration)
      .all(options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {string} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DockerServicesControllerApi
   */
  public logs(id: string, options?: RawAxiosRequestConfig) {
    return DockerServicesControllerApiFp(this.configuration)
      .logs(id, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {string} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof DockerServicesControllerApi
   */
  public one(id: string, options?: RawAxiosRequestConfig) {
    return DockerServicesControllerApiFp(this.configuration)
      .one(id, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
