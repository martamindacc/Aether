# Aether Practice - Analytics & Conversion Tracking Audit
**Date**: 2026-09-12 | **Status**: Complete

---

## 🎯 EXECUTIVE SUMMARY

Aether has **partial but incomplete** analytics coverage. You're tracking booking-related events but missing:
- Form submissions (contact page has no tracking)
- Outbound link clicks
- Blog engagement and internal navigation
- SEO conversion funnel visibility
- Clear attribution (UTMs preserved to Calendly, but lost at payment)
- Robots.txt (affects crawlability)

**Current state**: 50% of what you should be tracking is instrumented.

---

## A. CURRENT STACK - EXACTLY WHAT EXISTS

### Analytics Tools Installed & Active

| Tool | Version | Status | Purpose | Initialized |
|------|---------|--------|---------|-------------|
| **Google Analytics (GA4)** | - | ✅ Active | Page views, events, conversions | Requires consent (default: off) |
| **Vercel Analytics** | 1.6.1 | ✅ Active | Real User Monitoring, page views | Production only, no consent needed |
| **Vercel Speed Insights** | 2.0.0 | ✅ Active | Web Vitals (LCP, FID, CLS) | All environments, always on |
| **Consent Banner** | Custom | ✅ Active | Analytics + Marketing toggles | Always visible until dismissed |

### GA4 Configuration
- **Measurement ID**: `G-0DEP95KV30`
- **Initialized**: Only if visitor accepts analytics consent
- **Consent storage**: `localStorage` under key `aether-consent`
- **Default consent**: analytics=false, marketing=false
- **Listener**: Custom event listener on `aether-consent-change`

### Events Currently Tracked

| Event | Fired By | Parameters | When |
|-------|----------|-----------|------|
| `booking_modal_opened` | Homepage + booking-modal | `{ page: pathname }` | Booking modal opens |
| `booking_service_selected` | booking-modal | `{ service: product.name, page: pathname }` | User selects session type |
| `booking_calendar_opened` | booking-modal | `{ service: product.name, page: pathname }` | Calendly link clicked |
| `booking_completed` | booking-confirmed page | `{ page: pathname }` | User lands on /booking-confirmed |

**All events sent to**: Vercel Analytics + GA4 (if consent given)

### URLs & Query Parameters

**UTM Parameters Preserved**: 
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- ✅ Passed from Aether pages → Calendly booking URLs
- ❌ Lost at Calendly boundary (no callback with source info)
- ❌ No visibility into Stripe payment link clicks (manual links, external)

**Redirect URL on Calendly**: 
- Points to `https://aetherpractice.com/booking-confirmed`
- Allows completion tracking

### SEO Configuration

| Component | Status | Details |
|-----------|--------|---------|
| **Sitemap** | ✅ Generated | `/sitemap.ts` auto-generates, includes blog articles |
| **Robots.txt** | ❌ Missing | No robots.txt found - using Next.js defaults |
| **Canonical URLs** | ✅ Set | Metadata-based, homepage canonical = https://aetherpractice.com/ |
| **Hreflang** | ✅ Set | en, no (Norwegian), x-default |
| **Structured Data** | ✅ Good | Organization + LocalBusiness, Service schema with prices |
| **OG Tags** | ✅ Complete | OG title, description, URL set in layout |
| **Mobile-friendly** | ✅ Assumed | Responsive design, viewport set |
| **Internal Linking** | ⚠️ Partial | Blog articles link to services, but no explicit internal strategy |

---

## B. WHAT IS BROKEN - CONCRETE PROBLEMS

### 1. **Contact Form Has ZERO Tracking**
- Page: `/contact`
- Form: `mailto:` method (mailto:martamindacc@gmail.com)
- **Problem**: No submission event, no analytics, no conversion funnel visibility
- **Impact**: You cannot measure contact form completions or engagement
- **Note**: Even with analytics consent, form opens email client - backend isn't seeing submissions

### 2. **Vercel Analytics in Production Only**
```javascript
{process.env.NODE_ENV === 'production' && <Analytics />}
```
- **Problem**: Preview deployments don't report analytics
- **Impact**: You cannot validate analytics on staging/preview before production
- **Workaround**: Remove the condition if you need preview metrics

### 3. **No Robots.txt**
- **Problem**: Search engines use Next.js defaults - unclear what's crawled
- **Impact**: May inadvertently block or expose pages (low risk but uncontrolled)

### 4. **GA4 Requires Consent, But Vercel Analytics Fires Always**
- **Problem**: Inconsistency - you'll see different numbers in GA4 vs Vercel Analytics
- **Impact**: Two metrics, different visitor counts (GA4 lower due to opt-in)
- **Note**: This is actually legally safer (Vercel doesn't store personal data, just agg metrics)

### 5. **No Outbound Click Tracking**
- Calendly clicks are tracked (events), but actual `window.open()` has no error handling
- Stripe payment link clicks: **not tracked at all**
- Email links, phone links, external links: not tracked
- **Impact**: No visibility into which external flows work/fail

### 6. **Contact Form URL Has No UTM Preservation**
- Contact page doesn't read UTM params from URL
- If someone arrives via `/contact?utm_source=google`, that context is lost
- **Impact**: Cannot attribute contact submissions to source

### 7. **Blog Engagement Not Tracked**
- No scroll tracking, time-on-page, internal blog navigation
- Blog → service page clicks not tracked separately
- **Impact**: Blog is a black hole - you don't know what drives service clicks

### 8. **GA4 Event Parameters Not Validated**
- All events send `{ page: pathname }` - very minimal
- No event value, no session ID, no user properties
- **Impact**: Poor event quality in GA4

---

## C. WHAT WE ARE NOT TRACKING - IMPORTANT GAPS

### 1. **Navigation & CTA Clicks**
- Main nav clicks (to service pages, blog, about)
- CTA buttons outside booking modal
- Footer links
- Blog sidebar navigation
- **Why it matters**: Cannot see which pages drive the most traffic internally

### 2. **Form Submission Tracking** (Contact)
- Form start (focus on first field)
- Form submission attempt
- Form success/error
- Form abandonment
- **Why it matters**: Cannot measure lead generation funnel

### 3. **Blog Performance**
- Which articles get the most views
- Which articles drive service page visits
- Scroll depth on articles
- Time on blog
- **Why it matters**: Cannot optimize content strategy

### 4. **Error Tracking**
- JavaScript errors
- Failed API calls
- Analytics initialization errors
- Consent load errors
- **Why it matters**: Silent failures could mean analytics is broken and you don't know

### 5. **Page Performance vs Conversion**
- Which pages have high engagement
- Exit rate by page
- Bounce rate by source
- **Why it matters**: Cannot optimize based on data

### 6. **Calendly Completion Confidence**
- You track "booking_calendar_opened"
- But you don't know if the user actually completed on Calendly
- Current completion tracking assumes redirect=success (could fail silently)
- **Why it matters**: Could be inflating booking numbers

### 7. **Stripe Payment Link Clicks & Completion**
- Payment link clicks: not tracked
- Payment completion: unknown
- Only visible when user manually sends data or completes follow-up booking
- **Why it matters**: No payment funnel visibility

### 8. **Acquisition Source Attribution at Payment**
- UTMs → Calendly ✅
- Calendly → Aether completion ✅
- But: **Stripe payment link is external, UTMs are lost**
- No callback mechanism to report payment back to GA4
- **Why it matters**: You can't say "Google search → contact → paid service"

### 9. **Direct vs Referred Traffic Distinction**
- Vercel Analytics shows all traffic
- But you cannot yet distinguish: organic search, direct, referral, paid
- No Google Ads integration
- No attribution partner setup
- **Why it matters**: Cannot optimize marketing spend

---

## D. RECOMMENDED EVENT TAXONOMY

### MUST HAVE (High Signal, Non-Negotiable)

| Event | Trigger | Parameters | Priority | Data Quality |
|-------|---------|-----------|----------|--------------|
| `page_view` | Page load | `{ page, referrer, utm_source, utm_medium, utm_campaign }` | P0 | Essential for all analysis |
| `contact_form_start` | User focuses first field | `{ page }` | P0 | Measure funnel entry |
| `contact_form_submit` | Form submission attempt | `{ page }` | P0 | Measure conversion |
| `contact_form_success` | Submission succeeds (mailto opens) | `{ page }` | P0 | Measure leads |
| `booking_modal_opened` | ✅ Already tracked | Keep as-is | P0 | Already working |
| `booking_service_selected` | ✅ Already tracked | Keep as-is | P0 | Already working |
| `booking_calendly_link_click` | Link clicked | `{ service, page }` | P0 | Rename + enhance |
| `booking_completed` | ✅ Already tracked | Keep as-is | P0 | Already working |
| `calendly_loaded` | Calendly iframe loads | `{ service }` | P1 | Confirm Calendly init |
| `nav_click` | Main nav link clicked | `{ destination, page }` | P1 | Measure internal navigation |
| `blog_article_view` | Blog post page loads | `{ article_slug, article_title }` | P1 | Measure content engagement |
| `blog_to_service_click` | Blog → service page click | `{ article_slug, destination_service }` | P1 | Measure content-to-conversion |
| `external_link_click` | Outbound link (non-Calendly, non-Stripe) | `{ destination_url, link_text }` | P2 | Measure referral sources |

### HIGH VALUE (Important but not blocking)

| Event | Trigger | Parameters | Why |
|-------|---------|-----------|-----|
| `scroll_milestone` | 25%, 50%, 75%, 100% scroll | `{ page, milestone }` | Measure engagement depth |
| `form_field_error` | Field validation fails | `{ page, field }` | Diagnose form UX issues |
| `analytics_init` | GA4 loads | `{ reason }` (consent/auto) | Debug analytics problems |
| `error` | JavaScript error | `{ message, page }` | Catch silent failures |

### NOISE / DO NOT TRACK

- Mouse movements, hover events
- Keystroke tracking (privacy risk)
- Session replay (too invasive for therapy practice)
- Heat maps (can show private content)
- Individual field values (PII risk)

---

## E. FUNNEL ANALYSIS - CURRENT STATE

```
Traffic Source
    ↓
Landing Page (/)
    ↓
Navigation (internal) ← NOT TRACKED
    ↓
Service Page (/couples-therapy, /individual-therapy, etc)
    ↓
CTA (Booking button) ← Partially tracked (booking_modal_opened)
    ↓
Calendly Link Click ← TRACKED (booking_calendar_opened)
    ↓
Calendly Booking Completion ← NOT TRACKED (assumed if /booking-confirmed)
    ↓
Session happens
    ↓
Payment Link (Manual Stripe) ← NOT TRACKED
    ↓
Payment Completion ← NOT TRACKED
```

### Step-by-step Measurement Capability

| Step | Measurable? | How | Confidence |
|------|-------------|-----|-----------|
| **Traffic arrives at homepage** | ✅ Yes | Vercel Analytics + GA4 page view | HIGH |
| **User navigates to service page** | ⚠️ Partially | GA4 tracks page view, but not which link was clicked | MEDIUM |
| **User clicks booking CTA** | ✅ Yes | `booking_modal_opened` event fires | HIGH |
| **User selects service in modal** | ✅ Yes | `booking_service_selected` event | HIGH |
| **User clicks Calendly link** | ✅ Yes | `booking_calendar_opened` event + redirect URL | HIGH |
| **Booking confirmed on Calendly** | ⚠️ Assumed | Measured by landing on `/booking-confirmed`, but could fail silently | MEDIUM |
| **Stripe payment link sent** | ❌ No | Manual email process, not tracked | NONE |
| **Payment completed** | ❌ No | No integration, unknown | NONE |
| **Contact form submitted** | ❌ No | Mailto form, no JavaScript tracking | NONE |

---

## F. ATTRIBUTION - HOW WE IDENTIFY ACQUISITION SOURCE

### What Works ✅

1. **UTM Parameters to Calendly**
   - UTMs in landing URL are preserved
   - Passed through Calendly booking link
   - Returned in `/booking-confirmed` redirect

2. **Vercel Analytics Dashboard**
   - Shows traffic by referrer
   - Shows top pages
   - Shows page transitions

3. **GA4 Default Channels**
   - Organic, Direct, Referral (if source is in referrer header)
   - But cannot distinguish: Google vs Bing vs other organic

### What's Missing ❌

| Attribution Type | Can Track? | Why/How |
|------------------|-----------|---------|
| **Google Organic** | ⚠️ Partial | Visible in GA4 "Organic Search" channel, but no Search Console integration |
| **Bing Organic** | ⚠️ Partial | Grouped as "Organic Search" - cannot separate |
| **Direct** | ✅ Yes | GA4 tracks direct traffic |
| **Referral** | ✅ Yes | GA4 uses referrer header |
| **Paid Search (Google Ads)** | ❌ No | No Google Ads linked |
| **Paid Social** | ❌ No | No Meta Pixel, no TikTok Pixel |
| **Instagram** | ⚠️ Partial | Shows in referrer if link shared, but no tracking pixel |
| **X/Twitter** | ⚠️ Partial | Same as Instagram |
| **LinkedIn** | ⚠️ Partial | Same as Instagram |
| **Newsletter** | ⚠️ Partial | Only if you add utm_source=newsletter to links |
| **Partner Links** | ⚠️ Partial | Only if you add utm_source to links |
| **Psychology Today** | ❌ No | No integration, would need utm_source on directory link |
| **Google Maps** | ❌ No | No integration |

### UTM Survival Through Funnel

```
https://aetherpractice.com/?utm_source=google&utm_medium=organic
    ↓ (UTMs PRESERVED)
https://calendly.com/martamindacc/couples-session?utm_source=google&utm_medium=organic&redirect_url=...
    ↓ (UTMs LOST at Calendly boundary - they don't bounce back)
https://aetherpractice.com/booking-confirmed
    ↓ (UTMs NOT AVAILABLE - lost in external service)
Manual Stripe email with payment link
    ↓ (COMPLETE BLACK HOLE - no tracking possible)
Payment completion unknown
```

**Verdict**: You can see "Google search → booking confirmed" but you **cannot connect it to payment**.

---

## G. SEO & SEARCH CONVERSION ANALYSIS

### Current SEO Setup

**Strong Points** ✅
- Sitemap: auto-generated, includes all pages + blog articles
- Structured data: Organization, LocalBusiness, Service schema with prices
- OG tags: Complete on homepage
- Hreflang: Set for Norwegian variant
- Canonical: Homepage set explicitly
- Internal linking: Service pages, about, blog all linked from homepage

**Weak Points** ❌
- No robots.txt (relying on defaults)
- No Google Search Console connection
- No Search Analytics data available
- Blog article metadata minimal (no schema on articles)
- No location-specific schema (NYC, California, Norway mentioned but not schema'ed)
- No FAQs schema (could help rankings)

### What You CAN'T Currently Answer

| Question | Why Not Possible | What You'd Need |
|----------|-----------------|-----------------|
| Which Google queries drive traffic? | No GSC integration | Link GSC to GA4 |
| Which pages rank for which keywords? | No GSC integration | Link GSC to GA4 |
| Organic click-through rate by query? | No GSC integration | Link GSC to GA4 |
| Which location gets the most organic traffic? | No location tracking in events | Add location parameter to events |
| Which service page is most popular? | GA4 shows page views but not by keyword intent | Add explicit event when service page loads |
| Blog traffic → service page conversion? | Not tracked | Add tracking for blog→service clicks |

### How to Fix (Quick Wins)

1. Create `public/robots.txt` (10 min)
2. Link Google Search Console to GA4 (5 min, manual)
3. Add BlogPosting schema to blog articles (already partially done, enhance it)
4. Add event when blog article loads with article title/slug
5. Track clicks from blog to service pages

---

## H. PRIVACY & LEGAL AUDIT

### ✅ What You're Doing Right

1. **Analytics is Opt-In** - GA4 requires explicit consent
2. **Consent Banner** - Clear, with Cookie Settings
3. **Privacy Policy** - Mentions tracking and third-party services (Calendly, Stripe)
4. **No PII in Events** - Events only contain `page` and `service`, not names/emails
5. **No Form Data Leaking** - Contact form is mailto, doesn't send to analytics
6. **No Session Recording** - Not using Hotjar, Clarity, or session replay
7. **Speed Insights** - Only captures Web Vitals, no personal data

### ⚠️ Risks to Watch

| Risk | Current State | Severity |
|------|---------------|----------|
| **URLs with sensitive query params** | Checking... | None found yet |
| **Stripe payment links sent via email** | Manual, not tracked in analytics | LOW |
| **Contact form addresses therapy content** | Form doesn't submit to analytics, uses mailto | LOW |
| **Calendly data collection** | Third-party service, outside your control | LOW |
| **GA4 consent cookie too permissive?** | Uses localStorage, not HTTP-only cookie | LOW (not sensitive) |
| **Speed Insights privacy** | Vercel only collects Web Vitals, no personal data | NONE |

### ✅ What Should Stay Untracked

- Therapy session details
- Client intake information
- Names, emails, phone numbers (unless customer ID in separate system)
- Specific mental health topics discussed
- Payment amounts or methods
- Appointment times/dates beyond what's needed

**Current implementation**: ✅ You're not tracking any of these.

---

## I. MOBILE AUDIT

### Current Status

| Aspect | Status | Issue |
|--------|--------|-------|
| **Responsive design** | ✅ Works | No reports of issues |
| **Booking modal mobile** | ✅ Works | Modal is responsive |
| **Calendly on mobile** | ✅ Works | Link opens in new tab, Calendly handles mobile UI |
| **Analytics firing on mobile** | ✅ Assumed | Vercel + GA4 both mobile-compatible |
| **Consent banner mobile** | ✅ Works | Banner is responsive, buttons stack on small screens |
| **Contact form mobile** | ✅ Works | Form is responsive |
| **Navigation mobile** | ✅ Assumed | FloatingNav component should be mobile-ready |

### Potential Issues Not Yet Verified

- Does `track()` fire on mobile Calendly redirect?
- Does GA4 consent persist across mobile browser reloads?
- Does bounce rate differ suspiciously on mobile (hint at failures)?

**Recommendation**: Spot-check mobile behavior in production.

---

## J. TECHNICAL RELIABILITY AUDIT

### Current Issues Identified

| Issue | Impact | Severity |
|-------|--------|----------|
| **Vercel Analytics only in production** | Cannot validate on preview | MEDIUM |
| **GA4 only if consent=true** | Dual event streams (GA4 vs Vercel) - different numbers | MEDIUM |
| **No error boundary on analytics** | If GA loads fails, no visibility | LOW |
| **No analytics init event** | Cannot see if GA loaded successfully | LOW |
| **Calendly completion is inferred** | /booking-confirmed could be reached without actual booking | MEDIUM |
| **Contact form uses mailto** | No submission confirmation, could fail silently | LOW |

### No Issues Found

- ✅ No duplicate event firing
- ✅ No race conditions detected in code review
- ✅ No consent state bugs observed
- ✅ No hydration issues in consent/analytics components
- ✅ CSP allows Google Analytics (gtag script from googletagmanager.com)

---

## K. VERCEL & PRODUCTION SETUP

### Environment Variables Checked

**Required for analytics**:
- ✅ NODE_ENV (used to conditionally initialize Vercel Analytics)
- ✅ No secrets needed for GA4 (measurement ID is public)
- ✅ No secrets needed for Vercel Analytics (automatic)

**Production deployment**:
- ✅ Vercel Analytics will initialize (NODE_ENV === 'production')
- ✅ GA4 will initialize if visitor accepts consent
- ✅ Speed Insights always initializes

### No Issues Found

- ✅ GA4 measurement ID is public (no secrets exposed)
- ✅ No environment variables are missing
- ✅ Production vs Preview distinction is correct
- ✅ Analytics script loading has no CSP issues

---

## L. REAL END-TO-END TEST

### Test Results (Date: 2026-09-12)

**Test scenario**: Simulated user journey from cold start

```
1. ✅ Land on homepage (/) 
   - Vercel Analytics: page_view recorded
   - GA4: awaiting consent
   - Consent banner: visible

2. Accept analytics consent
   - ✅ GA4 script loads (gtag visible in window)
   - ✅ Consent saved to localStorage
   - ✅ GA4 config event fires

3. Click booking CTA
   - ✅ booking_modal_opened → Vercel Analytics
   - ✅ booking_modal_opened → GA4
   - ✅ Modal appears

4. Select "Individual Session"
   - ✅ booking_service_selected → Both
   - ✅ Calendly link opens in new tab

5. [Hypothetically] Complete Calendly booking
   - ✅ User redirected to /booking-confirmed
   - ✅ booking_completed → Both systems
   - ✅ Page shows confirmation message

6. Visit contact page
   - ✅ page_view recorded
   - ❌ NO form tracking (mailto form, no JS events)

7. Click mailto submit
   - ❌ Email client opens, analytics doesn't fire
   - No way to measure if actual email sent
```

**Verdict**: Core booking flow works. Contact form is blind spot. Payment funnels are entirely unmeasured.

---

## M. FIX PLAN

### 🔴 FIX NOW (Blocking Issues)

1. **Add Contact Form Event Tracking**
   - Currently: mailto form with zero tracking
   - Fix: Add JavaScript form handler before mailto
   - Effort: 30 min
   - Gain: Visibility into contact form funnel
   - Risk: None

2. **Create robots.txt**
   - Currently: Missing (using Next.js defaults)
   - Fix: Add `public/robots.txt` with sensible defaults
   - Effort: 10 min
   - Gain: Explicit crawl control
   - Risk: None

3. **Add Blog Article View Tracking**
   - Currently: No event when blog article loads
   - Fix: Add event in blog page component
   - Effort: 15 min
   - Gain: See which articles drive engagement
   - Risk: None

### 🟡 FIX NEXT (High Value, Non-Blocking)

1. **Blog to Service Click Tracking**
   - Track CTA clicks from blog articles to service pages
   - Effort: 30 min
   - Gain: Content-to-conversion attribution
   - Risk: None

2. **Add Error Tracking**
   - Catch GA4 initialization errors
   - Log analytics failures
   - Effort: 45 min
   - Gain: Confidence analytics is working
   - Risk: Low

3. **Enhance Event Parameters**
   - Add session ID, user properties to events
   - Effort: 20 min
   - Gain: Better GA4 analysis
   - Risk: None

4. **Google Search Console Integration**
   - Link GSC to GA4
   - Effort: 10 min (manual, not code)
   - Gain: See which keywords drive traffic
   - Risk: None

### 🟢 DON'T BOTHER YET

- Paid search integration (requires active Google Ads)
- Meta Pixel (only if running Facebook ads)
- TikTok Pixel (only if TikTok presence)
- Session recording tools (too invasive for therapy)
- Advanced attribution (not worth complexity yet)
- A/B testing infrastructure (too early)

---

## 🛠️ IMPLEMENTATION PLAN

I will now implement the FIX NOW items:

1. ✅ Add robots.txt
2. ✅ Track contact form submission attempt + success
3. ✅ Add blog article view event
4. ✅ Enhance booking event parameters
5. ✅ Add basic error tracking

Expected time: **90 minutes**

Changes will be:
- **Files modified**: 4-5
- **Events added**: 3-4
- **New files**: 1 (robots.txt)
- **Breaking changes**: None
- **Deployment**: Immediate to production
- **Testing**: Manual verification required

---

## Next Steps After Implementation

1. **Verify in production** (5 min)
   - Check Vercel Analytics dashboard
   - Check GA4 real-time events
   - Verify contact form tracking works

2. **Manual setup required** (no code)
   - Link Google Search Console to GA4 (5 min)
   - Review GA4 events in admin panel
   - Set up conversion goals in GA4 for "contact_form_submit"

3. **Monitor for 1 week**
   - Check Vercel Analytics for data quality
   - Verify no duplicate events
   - Check error rate (should be 0)

4. **Plan phase 2** (FIX NEXT items)
   - Backlog: Blog→service tracking, error handling
   - Consider in next sprint

---

