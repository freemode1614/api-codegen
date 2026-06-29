/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/filename-case */
import type { OpenAPIV3_1 } from 'openapi-types';
import { Base } from '../core/index.js';
import { OpenAPIVersion, VersionedProvider } from './VersionedProvider.js';

export class V3_1 extends VersionedProvider {
	protected readonly doc: OpenAPIV3_1.Document;
	readonly version = OpenAPIVersion.v3_1;

	constructor(doc: OpenAPIV3_1.Document) {
		super();
		this.doc = doc;
	}

	protected override formatRefName(name: string): string {
		// V3_1 normalizes ref names to UpperCamelCase (V3 only capitalizes
		// the first character). Preserved for backward compatibility.
		return Base.upperCamelCase(name);
	}

	protected override getSchemaContainer():
		| Record<string, OpenAPIV3_1.SchemaObject>
		| undefined {
		return this.doc.components?.schemas as any;
	}

	protected override getParameterContainer():
		| Record<string, OpenAPIV3_1.ParameterObject>
		| undefined {
		return this.doc.components?.parameters as any;
	}

	protected override getResponseContainer():
		| Record<string, OpenAPIV3_1.ResponseObject>
		| undefined {
		return this.doc.components?.responses as any;
	}

	protected override getRequestBodyContainer():
		| Record<string, OpenAPIV3_1.RequestBodyObject>
		| undefined {
		return this.doc.components?.requestBodies as any;
	}
}
