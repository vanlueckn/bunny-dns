/**
 * DNS record type as a string
 */
export type DNSRecordTypeString =
	| "A"
	| "AAAA"
	| "CNAME"
	| "TXT"
	| "MX"
	| "RDR"
	| "PZ"
	| "SRV"
	| "CAA"
	| "PTR"
	| "NS";

/**
 * DNS record type as a number
 */
export type DNSRecordTypeNumber = 0 | 1 | 2 | 3 | 4 | 5 | 7 | 8 | 9 | 10 | 12;

/**
 * DNS record type (string or number)
 */
export type DNSRecordType = DNSRecordTypeString | DNSRecordTypeNumber;

/**
 * A DNS record in a zone
 */
export interface Record {
	/** Record ID */
	Id: number;
	/** Record type */
	Type: DNSRecordTypeString;
	/** Record name */
	Name: string;
	/** Record value */
	Value: string;
	/** Time to live in seconds */
	Ttl: number;
	/** Weight for SRV records */
	Weight: number;
	/** Whether the record is disabled */
	Disabled: boolean;
	/** Tag for CAA records */
	Tag?: string;
	/** Flags for CAA records */
	Flags?: number;
}

/**
 * A DNS zone
 */
export interface Zone {
	/** Zone ID */
	Id: number;
	/** Domain name */
	Domain: string;
	/** Records in the zone */
	Records: Record[];
	/** Date when the zone was created */
	DateCreated?: string;
	/** Date when the zone was modified */
	DateModified?: string;
	/** Whether the zone is currently being updated */
	IsUpdating?: boolean;
	/** Number of records in the zone */
	RecordsCount?: number;
	/** Name servers for the zone */
	NameServers?: string[];
}

/**
 * Statistics for a DNS zone
 */
export interface ZoneStatistics {
	/** Total queries */
	TotalQueries?: number;
	/** Queries by date */
	QueriesByDate?: Array<{
		Date: string;
		Count: number;
	}>;
}

/**
 * Options for creating a Bunny connection
 */
export interface BunnyOptions {
	/** Bunny API key */
	key: string;
}

/**
 * Options for adding a DNS record to a zone
 */
export interface AddRecordOptions {
	/** Record type (default: "A") */
	type?: DNSRecordType;
	/** Record name */
	name: string;
	/** Record value */
	value: string;
	/** Time to live in seconds (default: 3600) */
	ttl?: number;
	/** Weight for SRV records (default: 0) */
	weight?: number;
	/** Whether the record is disabled (default: false) */
	disabled?: boolean;
}

/**
 * Options for updating a DNS record
 */
export interface UpdateRecordOptions {
	/** New record value */
	value?: string;
	/** New time to live in seconds */
	ttl?: number;
	/** New weight for SRV records */
	weight?: number;
	/** New tag for CAA records */
	tag?: string;
	/** New flags for CAA records */
	flags?: number;
	/** Whether the record is disabled */
	disabled?: boolean;
}

/**
 * Bunny DNS client for managing DNS zones via the Bunny.net API
 */
export default class Bunny {
	/**
	 * Create a new Bunny DNS client
	 * @param options - Connection options including API key
	 */
	constructor(options?: BunnyOptions);

	/**
	 * Get all DNS zones
	 * @returns Promise resolving to array of zones
	 */
	zones(): Promise<Zone[]>;

	/**
	 * Get a specific DNS zone by ID or domain name
	 * @param zone_id - Zone ID (number) or domain name (string)
	 * @returns Promise resolving to the zone
	 */
	zone(zone_id: number | string): Promise<Zone>;

	/**
	 * Get statistics for a DNS zone
	 * @param zone_id - Zone ID (number) or domain name (string)
	 * @returns Promise resolving to zone statistics
	 */
	zone_statistics(zone_id: number | string): Promise<ZoneStatistics>;

	/**
	 * Add a new DNS zone
	 * @param name - Domain name for the zone
	 * @returns Promise resolving to the created zone
	 */
	add_zone(name: string): Promise<Zone>;

	/**
	 * Remove a DNS zone
	 * @param zone_id - Zone ID (number) or domain name (string)
	 * @returns Promise resolving when zone is removed
	 */
	remove_zone(zone_id: number | string): Promise<void>;

	/**
	 * Add a DNS record to a zone
	 * @param zone_id - Zone ID (number) or domain name (string)
	 * @param options - Record options
	 * @returns Promise resolving to the created record
	 */
	add_zone_record(zone_id: number | string, options: AddRecordOptions): Promise<Record>;

	/**
	 * Update a DNS record in a zone
	 * @param zone_id - Zone ID (number) or domain name (string)
	 * @param record_id - Record ID
	 * @param options - Record update options
	 * @returns Promise resolving to the updated record
	 */
	update_zone_record(zone_id: number | string, record_id: number, options: UpdateRecordOptions): Promise<Record>;

	/**
	 * Remove a DNS record from a zone
	 * @param zone_id - Zone ID (number) or domain name (string)
	 * @param record_id - Record ID
	 * @returns Promise resolving when record is removed
	 */
	remove_zone_record(zone_id: number | string, record_id: number): Promise<void>;

	/**
	 * Convert a DNS record type to a number
	 * @param type - Record type as string or number
	 * @returns Record type as number
	 */
	type2number(type: DNSRecordType): DNSRecordTypeNumber;

	/**
	 * Convert a DNS record type to a string
	 * @param type - Record type as string or number
	 * @returns Record type as string
	 */
	type2string(type: DNSRecordType): DNSRecordTypeString;
}
