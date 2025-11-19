import os
import re

# Base directory
base_dir = "C:/Users/kamal/Documents/GitHub/GrowthExperts/src/pages"

# Define the internal link updates for each page
updates = {
    "local-seo.astro": [
        {
            "find": "Through strategic <strong>local keyword</strong> targeting and technical <strong>search engine optimization</strong>",
            "replace": 'Through strategic <strong>local keyword</strong> targeting and <a href="/technical-seo/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Technical SEO</strong></a>'
        },
        {
            "find": "Every successful <strong>local SEO campaign</strong> starts with understanding your current position.",
            "replace": 'Every successful <strong>local SEO campaign</strong> starts with understanding your current position through a comprehensive <a href="/seo-audit/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>SEO Audit</strong></a>.'
        }
    ],
    "international-seo.astro": [
        {
            "find": "We help Australian businesses break into new markets while maintaining strong <strong>local SEO</strong> foundations.",
            "replace": 'We help Australian businesses break into new markets, whether through <a href="/enterprise-seo/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Enterprise SEO</strong></a> for large-scale operations, <a href="/b2b-seo/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>B2B SEO</strong></a> for business markets, or comprehensive <a href="/technical-seo/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Technical SEO</strong></a> implementation.'
        }
    ],
    "b2b-seo.astro": [
        {
            "find": "in today's digital-first business environment",
            "replace": 'in today\'s digital-first business environment. Our approach integrates <a href="/enterprise-seo/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Enterprise SEO</strong></a> scalability with strategic <a href="/content-marketing/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Content Marketing</strong></a> and authoritative <a href="/link-building/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Link Building</strong></a>'
        }
    ],
    "small-business-seo.astro": [
        {
            "find": "proven strategies that help small businesses",
            "replace": 'proven strategies including <a href="/local-seo/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Local SEO</strong></a>, comprehensive <a href="/seo-audit/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>SEO Audit</strong></a> services, and <a href="/technical-seo/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Technical SEO</strong></a> that help small businesses'
        }
    ],
    "enterprise-seo.astro": [
        {
            "find": "complex technical requirements and",
            "replace": 'complex <a href="/technical-seo/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Technical SEO</strong></a> requirements, <a href="/international-seo/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>International SEO</strong></a> expansion, and <a href="/b2b-seo/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>B2B SEO</strong></a> strategies and'
        }
    ],
    "technical-seo.astro": [
        {
            "find": "technical foundation of your website",
            "replace": 'technical foundation of your website through comprehensive <a href="/seo-audit/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>SEO Audit</strong></a> processes, supporting both <a href="/local-seo/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Local SEO</strong></a> and <a href="/enterprise-seo/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Enterprise SEO</strong></a> initiatives'
        }
    ],
    "content-marketing.astro": [
        {
            "find": "that drives organic traffic and",
            "replace": 'that drives organic traffic through strategic <a href="/link-building/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Link Building</strong></a>, supports <a href="/b2b-seo/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>B2B SEO</strong></a> objectives, and is informed by thorough <a href="/seo-audit/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>SEO Audit</strong></a> insights and'
        }
    ],
    "link-building.astro": [
        {
            "find": "high-quality backlinks that boost",
            "replace": 'high-quality backlinks through <a href="/content-marketing/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Content Marketing</strong></a> excellence, <a href="/technical-seo/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Technical SEO</strong></a> optimization, and comprehensive <a href="/seo-audit/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>SEO Audit</strong></a> insights that boost'
        }
    ],
    "seo-audit.astro": [
        {
            "find": "comprehensive analysis of your website",
            "replace": 'comprehensive analysis of your website including <a href="/technical-seo/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Technical SEO</strong></a> health, <a href="/local-seo/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Local SEO</strong></a> opportunities, and <a href="/small-business-seo/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Small Business SEO</strong></a> improvements'
        }
    ],
    "ecommerce-seo.astro": [
        {
            "find": "e-commerce platforms to rank",
            "replace": 'e-commerce platforms through advanced <a href="/technical-seo/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Technical SEO</strong></a>, strategic <a href="/content-marketing/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Content Marketing</strong></a>, and authoritative <a href="/link-building/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>Link Building</strong></a> to rank'
        }
    ]
}

# Industry pages updates - add branded link and service links
industry_updates = {
    "accountant-seo.astro": {
        "brand": "Digital Growth Experts",
        "services": ["B2B SEO", "Local SEO"]
    },
    "childcare-seo.astro": {
        "brand": "Digital Growth Experts",
        "services": ["Local SEO", "Small Business SEO"]
    },
    "dental-seo.astro": {
        "brand": "Digital Growth Experts",
        "services": ["Local SEO", "Content Marketing"]
    },
    "electrician-seo.astro": {
        "brand": "Digital Growth Experts",
        "services": ["Local SEO", "Small Business SEO"]
    },
    "healthcare-seo.astro": {
        "brand": "Digital Growth Experts",
        "services": ["Local SEO", "Content Marketing"]
    },
    "lawyer-seo.astro": {
        "brand": "Digital Growth Experts",
        "services": ["B2B SEO", "Local SEO"]
    },
    "mortgage-broker-seo.astro": {
        "brand": "Digital Growth Experts",
        "services": ["B2B SEO", "Local SEO"]
    },
    "physio-seo.astro": {
        "brand": "Digital Growth Experts",
        "services": ["Local SEO", "Content Marketing"]
    },
    "plumber-seo.astro": {
        "brand": "Digital Growth Experts",
        "services": ["Local SEO", "Small Business SEO"]
    },
    "podiatry-seo.astro": {
        "brand": "Digital Growth Experts",
        "services": ["Local SEO", "Content Marketing"]
    },
    "real-estate-seo.astro": {
        "brand": "Digital Growth Experts",
        "services": ["Local SEO", "Small Business SEO"]
    },
    "seo-for-charities.astro": {
        "brand": "Digital Growth Experts",
        "services": ["Small Business SEO", "Content Marketing"]
    }
}

# Process service pages
print("Processing service pages...")
for filename, replacements in updates.items():
    filepath = os.path.join(base_dir, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        for replacement in replacements:
            if replacement["find"] in content and replacement["replace"] not in content:
                content = content.replace(replacement["find"], replacement["replace"])
                print(f"[UPDATED] {filename}: Added internal links")

        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
        else:
            print(f"[INFO] {filename}: No changes needed")
    else:
        print(f"[WARNING] {filename}: File not found")

# Process industry pages - adding branded link at the beginning
print("\nProcessing industry pages...")
for filename, links in industry_updates.items():
    filepath = os.path.join(base_dir, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Add branded link - find first paragraph with "Our" and replace
        if f'href="/"' not in content:
            content = re.sub(
                r'Our\s+',
                f'<a href="/" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>{links["brand"]}</strong></a>\'s ',
                content,
                count=1
            )

        # Add service links
        service_links = []
        for service in links["services"]:
            url = f"/{service.lower().replace(' ', '-')}/"
            if f'href="{url}"' not in content:
                service_links.append(f'<a href="{url}" class="text-primary-600 hover:text-primary-700 font-semibold"><strong>{service}</strong></a>')

        if service_links and "proven SEO strategies" in content:
            links_text = " including " + ", ".join(service_links[:-1])
            if len(service_links) > 1:
                links_text += f" and {service_links[-1]}"
            else:
                links_text += service_links[0]

            content = content.replace(
                "proven SEO strategies",
                f"proven SEO strategies{links_text}",
                1
            )

        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"[UPDATED] Updated {filename}: Added branded and service links")
        else:
            print(f"[INFO] {filename}: No changes needed")
    else:
        print(f"[WARNING] {filename}: File not found")

print("\n[COMPLETE] Internal linking optimization complete!")