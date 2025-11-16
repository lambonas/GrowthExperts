#!/usr/bin/env python3
"""
Script to add remaining internal links according to the linking strategy.
This implements all Phase 1-5 links systematically.
"""

import re
from pathlib import Path

# Base directory
BASE_DIR = Path(r"C:\Users\kamal\Documents\GitHub\GrowthExperts\src\pages")

# Link additions organized by phase
LINK_ADDITIONS = {
    # PHASE 1: Industry → Service Links
    "healthcare-seo.astro": [
        {
            "search": r'<strong>Technical SEO</strong> forms',
            "replace": r'<a href="/technical-seo/">**Technical SEO**</a> forms',
            "description": "Add technical SEO link"
        },
        {
            "search": r'<!-- Conclusion Section -->',
            "replace": r'<!-- Conclusion Section -->\n            <p class="text-gray-700 leading-relaxed mb-4">\n              Have questions about SEO for healthcare? Visit our <a href="/faq/">**SEO FAQ page**</a> for answers to common questions.\n            </p>',
            "description": "Add FAQ link before conclusion"
        }
    ],

    "lawyer-seo.astro": [
        {
            "search": r'quality content',
            "replace": r'quality <a href="/content-marketing/">**content marketing**</a>',
            "description": "Add content marketing link",
            "first_only": True
        },
        {
            "search": r'authoritative backlinks',
            "replace": r'authoritative <a href="/link-building/">**backlinks**</a>',
            "description": "Add link building link",
            "first_only": True
        }
    ],

    "real-estate-seo.astro": [
        {
            "search": r'content strategy',
            "replace": r'<a href="/content-marketing/">**content strategy**</a>',
            "description": "Add content marketing link",
            "first_only": True
        },
        {
            "search": r'enterprise-level SEO',
            "replace": r'<a href="/enterprise-seo/">**enterprise-level SEO**</a>',
            "description": "Add enterprise SEO link",
            "first_only": True
        }
    ],

    "electrician-seo.astro": [
        {
            "search": r'local SEO is crucial',
            "replace": r'<a href="/local-seo/">**local SEO**</a> is crucial',
            "description": "Add local SEO link",
            "first_only": True
        }
    ],

    "plumber-seo.astro": [
        {
            "search": r'dominate local search',
            "replace": r'dominate <a href="/local-seo/">**local search**</a>',
            "description": "Add local SEO link",
            "first_only": True
        }
    ],

    "accountant-seo.astro": [
        {
            "search": r'B2B marketing',
            "replace": r'<a href="/b2b-seo/">**B2B marketing**</a>',
            "description": "Add B2B SEO link",
            "first_only": True
        },
        {
            "search": r'small business clients',
            "replace": r'<a href="/small-business-seo/">**small business**</a> clients',
            "description": "Add small business SEO link",
            "first_only": True
        }
    ],

    "physio-seo.astro": [
        {
            "search": r'"physiotherapist near me"',
            "replace": r'<a href="/local-seo/">**"physiotherapist near me"**</a>',
            "description": "Add local SEO link",
            "first_only": True
        },
        {
            "search": r'small practice',
            "replace": r'<a href="/small-business-seo/">**small practice**</a>',
            "description": "Add small business SEO link",
            "first_only": True
        }
    ],

    "podiatry-seo.astro": [
        {
            "search": r'Local SEO for Podiatrists',
            "replace": r'<a href="/local-seo/">**Local SEO**</a> for Podiatrists',
            "description": "Add local SEO link"
        },
        {
            "search": r'small practice',
            "replace": r'<a href="/small-business-seo/">**small practice**</a>',
            "description": "Add small business SEO link",
            "first_only": True
        },
        {
            "search": r'View all industries we serve',
            "replace": r'<a href="/industries/">**View all industries we serve**</a>',
            "description": "Add industries hub link"
        }
    ],

    "childcare-seo.astro": [
        {
            "search": r'local search optimisation',
            "replace": r'<a href="/local-seo/">**local search**</a> optimisation',
            "description": "Add local SEO link",
            "first_only": True
        },
        {
            "search": r'small childcare centres',
            "replace": r'<a href="/small-business-seo/">**small childcare centres**</a>',
            "description": "Add small business SEO link",
            "first_only": True
        }
    ],

    "b2b-seo.astro": [
        {
            "search": r'enterprise-level capabilities',
            "replace": r'<a href="/enterprise-seo/">**enterprise-level**</a> capabilities',
            "description": "Add enterprise SEO link",
            "first_only": True
        },
        {
            "search": r'authoritative <strong>content marketing</strong>',
            "replace": r'authoritative <a href="/content-marketing/">**content marketing**</a>',
            "description": "Add content marketing link"
        }
    ],

    # PHASE 2: Service → Industry Links
    "local-seo.astro": [
        {
            "search": r'medical practices',
            "replace": r'<a href="/healthcare-seo/">**medical practices**</a>',
            "description": "Add healthcare SEO link",
            "first_only": True
        },
        {
            "search": r'dental clinics',
            "replace": r'<a href="/dental-seo/">**dental clinics**</a>',
            "description": "Add dental SEO link",
            "first_only": True
        },
        {
            "search": r'law firms',
            "replace": r'<a href="/lawyer-seo/">**law firms**</a>',
            "description": "Add lawyer SEO link",
            "first_only": True
        }
    ],

    "content-marketing.astro": [
        {
            "search": r'healthcare providers',
            "replace": r'<a href="/healthcare-seo/">**healthcare providers**</a>',
            "description": "Add healthcare SEO link",
            "first_only": True
        },
        {
            "search": r'legal professionals',
            "replace": r'<a href="/lawyer-seo/">**legal professionals**</a>',
            "description": "Add lawyer SEO link",
            "first_only": True
        },
        {
            "search": r'real estate agents',
            "replace": r'<a href="/real-estate-seo/">**real estate agents**</a>',
            "description": "Add real estate SEO link",
            "first_only": True
        }
    ],

    "small-business-seo.astro": [
        {
            "search": r'dental practices',
            "replace": r'<a href="/dental-seo/">**dental practices**</a>',
            "description": "Add dental SEO link",
            "first_only": True
        },
        {
            "search": r'accounting firms',
            "replace": r'<a href="/accountant-seo/">**accounting firms**</a>',
            "description": "Add accountant SEO link",
            "first_only": True
        }
    ],

    "enterprise-seo.astro": [
        {
            "search": r'large real estate',
            "replace": r'large <a href="/real-estate-seo/">**real estate**</a>',
            "description": "Add real estate SEO link",
            "first_only": True
        },
        {
            "search": r'mortgage brokers',
            "replace": r'<a href="/mortgage-broker-seo/">**mortgage brokers**</a>',
            "description": "Add mortgage broker SEO link",
            "first_only": True
        }
    ],

    "technical-seo.astro": [
        {
            "search": r'healthcare websites',
            "replace": r'<a href="/healthcare-seo/">**healthcare websites**</a>',
            "description": "Add healthcare SEO link",
            "first_only": True
        },
        {
            "search": r'eCommerce sites',
            "replace": r'<a href="/ecommerce-seo/">**eCommerce sites**</a>',
            "description": "Add ecommerce SEO link",
            "first_only": True
        }
    ],
}

# Hub and trust links to add to ALL pages
HUB_LINKS = {
    # Industry pages get link back to /industries/
    "industry_pages": [
        "healthcare-seo.astro", "dental-seo.astro", "lawyer-seo.astro",
        "real-estate-seo.astro", "electrician-seo.astro", "plumber-seo.astro",
        "accountant-seo.astro", "physio-seo.astro", "podiatry-seo.astro",
        "childcare-seo.astro", "b2b-seo.astro", "mortgage-broker-seo.astro"
    ],
    "industry_hub_link": {
        "search": r'(<!-- Conclusion Section -->)',
        "replace": r'<!-- Hub Navigation -->\n            <p class="text-gray-700 leading-relaxed mb-6 text-center">\n              <a href="/industries/" class="text-primary-600 hover:text-primary-700 font-semibold text-lg">Explore all our **industry-specific SEO services** →</a>\n            </p>\n            \1',
        "description": "Add industries hub link"
    },

    # Service pages get link back to /services/
    "service_pages": [
        "local-seo.astro", "content-marketing.astro", "small-business-seo.astro",
        "enterprise-seo.astro", "technical-seo.astro", "ecommerce-seo.astro",
        "international-seo.astro"
    ],
    "service_hub_link": {
        "search": r'(<!-- Conclusion Section -->)',
        "replace": r'<!-- Hub Navigation -->\n            <p class="text-gray-700 leading-relaxed mb-6 text-center">\n              <a href="/services/" class="text-primary-600 hover:text-primary-700 font-semibold text-lg">Explore all our **SEO services** →</a>\n            </p>\n            \1',
        "description": "Add services hub link"
    }
}

def add_links_to_file(filepath, link_specs):
    """Add links to a specific file based on specifications."""
    try:
        content = filepath.read_text(encoding='utf-8')
        original_content = content
        changes_made = []

        for spec in link_specs:
            search_pattern = spec['search']
            replacement = spec['replace']
            description = spec.get('description', 'Link addition')
            first_only = spec.get('first_only', False)

            if first_only:
                # Replace only the first occurrence
                if re.search(search_pattern, content):
                    content = re.sub(search_pattern, replacement, content, count=1)
                    changes_made.append(description)
            else:
                # Replace all occurrences
                count = len(re.findall(search_pattern, content))
                if count > 0:
                    content = re.sub(search_pattern, replacement, content)
                    changes_made.append(f"{description} ({count} instances)")

        if content != original_content:
            filepath.write_text(content, encoding='utf-8')
            return changes_made
        return []

    except Exception as e:
        print(f"Error processing {filepath.name}: {e}")
        return []

def main():
    """Main execution function."""
    print("Starting internal link addition process...")
    print("=" * 80)

    total_changes = 0
    results = {}

    # Phase 1 & 2: Specific page links
    for filename, link_specs in LINK_ADDITIONS.items():
        filepath = BASE_DIR / filename
        if filepath.exists():
            changes = add_links_to_file(filepath, link_specs)
            if changes:
                results[filename] = changes
                total_changes += len(changes)
                print(f"\n[+] {filename}:")
                for change in changes:
                    print(f"  - {change}")
        else:
            print(f"\n[!] {filename}: FILE NOT FOUND")

    # Phase 3: Hub links
    print("\n" + "=" * 80)
    print("Adding hub navigation links...")
    print("=" * 80)

    # Industry pages → /industries/
    for filename in HUB_LINKS['industry_pages']:
        filepath = BASE_DIR / filename
        if filepath.exists():
            changes = add_links_to_file(filepath, [HUB_LINKS['industry_hub_link']])
            if changes:
                if filename not in results:
                    results[filename] = []
                results[filename].extend(changes)
                total_changes += len(changes)
                print(f"[+] {filename}: Added industries hub link")

    # Service pages → /services/
    for filename in HUB_LINKS['service_pages']:
        filepath = BASE_DIR / filename
        if filepath.exists():
            changes = add_links_to_file(filepath, [HUB_LINKS['service_hub_link']])
            if changes:
                if filename not in results:
                    results[filename] = []
                results[filename].extend(changes)
                total_changes += len(changes)
                print(f"[+] {filename}: Added services hub link")

    # Final summary
    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"Total files modified: {len(results)}")
    print(f"Total changes made: {total_changes}")
    print("\nDetailed changes by file:")
    for filename, changes in sorted(results.items()):
        print(f"\n{filename} ({len(changes)} changes):")
        for change in changes:
            print(f"  - {change}")

if __name__ == "__main__":
    main()
