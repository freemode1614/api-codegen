/* eslint-disable @typescript-eslint/no-explicit-any */
import type { OpenAPIV3 } from 'openapi-types';
import { OpenAPIVersion, VersionedProvider } from './VersionedProvider.js';

export class V3 extends VersionedProvider {
	protected readonly doc: OpenAPIV3.Document;
	readonly version = OpenAPIVersion.v3;

	constructor(doc: OpenAPIV3.Document) {
		super();
		this.doc = doc;
	}

	protected override getSchemaContainer():
		| Record<string, OpenAPIV3.SchemaObject>
		| undefined {
		return this.doc.components?.schemas as any;
	}

	protected override getParameterContainer():
		| Record<string, OpenAPIV3.ParameterObject>
		| undefined {
		return this.doc.components?.parameters as any;
	}

	protected override getResponseContainer():
		| Record<string, OpenAPIV3.ResponseObject>
		| undefined {
		return this.doc.components?.responses as any;
	}

	protected override getRequestBodyContainer():
		| Record<string, OpenAPIV3.RequestBodyObject>
		| undefined {
		return this.doc.components?.requestBodies as any;
	}
}
