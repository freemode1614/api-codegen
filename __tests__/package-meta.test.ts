import { describe, it, expect } from 'vitest';
import packageJson from '../package.json' with { type: 'json' };

describe('package.json metadata (#10)', () => {
	it('declares vite ^7 || ^8 as a peer dependency', () => {
		const peer = (packageJson as unknown as { peerDependencies?: Record<string, string> })
			.peerDependencies;
		expect(peer).toBeDefined();
		expect(peer?.vite).toBe('^7 || ^8');
	});

	it('marks vite as an optional peer dependency', () => {
		const meta = (
			packageJson as unknown as {
				peerDependenciesMeta?: Record<string, { optional?: boolean }>;
			}
		).peerDependenciesMeta;
		expect(meta?.vite?.optional).toBe(true);
	});
});
