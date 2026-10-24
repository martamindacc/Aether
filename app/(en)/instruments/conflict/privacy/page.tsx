import Link from "next/link"
import { pageMetadata } from "@/lib/seo"

/**
 * Swap this one constant and every mention in the policy, visible text and
 * mailto link alike, follows.
 */
const CONTACT_EMAIL = "aet01support@gmail.com"

export const metadata = {
  ...pageMetadata({
    title: "AET01 Conflict Privacy Policy",
    description:
      "How AET01 Conflict handles your data: no account, nothing you type is stored by us, optional history kept only on your phone, and the service providers involved.",
    path: "/instruments/conflict/privacy",
    image: {
      url: "/opengraph-image?v=2",
      width: 1200,
      height: 630,
      alt: "AET01 Conflict — privacy policy",
    },
  }),
}

/**
 * Reading column for the policy. The descendant variants style the prose —
 * headings, paragraphs, lists and links — so the policy needs no styling of its own.
 */
const prose = [
  "max-w-4xl font-[Roboto,Arial,sans-serif] text-[19px] leading-[1.5] text-[#A3968C]",
  "[&>*:first-child]:mt-0",
  "[&_h2]:mt-20 [&_h2]:font-[NeueHaasDisplayRoman,Arial,sans-serif] [&_h2]:text-4xl [&_h2]:font-medium [&_h2]:tracking-tight sm:[&_h2]:text-5xl [&_h2]:text-[#F3E6DD]",
  "[&_h3]:mt-12 [&_h3]:font-[NeueHaasDisplayRoman,Arial,sans-serif] [&_h3]:text-3xl [&_h3]:font-medium [&_h3]:text-[#F3E6DD]",
  "[&_p]:mt-5",
  "[&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-6",
  "[&_li]:mt-2 [&_li]:pl-1",
  "[&_a]:text-[#D99148] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-[#F3E6DD]",
  "[&_strong]:font-medium [&_strong]:text-[#F3E6DD]",
].join(" ")

function Email() {
  return <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
}

export default function Page() {
  return (
    <div className="pb-24 pt-48">
      <h1 className="max-w-5xl font-[NeueHaasDisplayRoman,Arial,sans-serif] text-5xl font-medium leading-[0.95] tracking-tight text-[#F3E6DD] sm:text-7xl">
        Privacy Policy
      </h1>
      <p className="mt-8 font-[Roboto,Arial,sans-serif] text-sm uppercase tracking-wide text-[#93857B]">
        AET01 Conflict · Effective 24 October 2026
      </p>

      <div className={`mt-12 ${prose}`}>
        <p>
          This policy covers the AET01 Conflict mobile app (&ldquo;the app&rdquo;) on iOS and
          Android, the server it talks to, and the product pages at{" "}
          <Link href="/instruments/conflict">aetherpractice.com/instruments/conflict</Link>. It is
          written to match what the app actually does. Where a feature is optional, this policy says
          so and says what happens if you leave it off.
        </p>

        <h2>1. Who we are</h2>
        <p>
          AET01 Conflict is made and operated by Aether Practice, a sole proprietorship registered
          in Norway, which is the business of its owner (the &ldquo;we&rdquo; in this policy). For
          anything about this policy or your data, write to <Email />. We answer from that address
          and from no other.
        </p>

        <h2>2. What the app is, and what it is not</h2>
        <p>
          AET01 Conflict is a practice tool for communication skills between partners. You rehearse
          a hard conversation with a practice partner played by an AI model, get one plain lesson on
          each reply, use a short offline routine in the middle of a real argument, and look back at
          a disagreement afterwards to see the pattern in it.
        </p>
        <p>
          It is not therapy, treatment or diagnosis, and it is not a substitute for professional
          help. It does not assess, monitor or report on your health, and we do not treat what you
          write as a health record. It is not for emergencies. If you or someone else is in danger,
          call your local emergency number. In the United States you can call or text 988, the
          Suicide and Crisis Lifeline, at any time, and the National Domestic Violence Hotline is at
          1-800-799-7233. If the app detects that you may not be safe with your partner, it shows
          you support options instead of its tools.
        </p>
        <p>Feedback from the AI model can be wrong. Use your own judgement.</p>

        <h2>3. Who may use it</h2>
        <p>
          The app is for adults and is rated 18+ in the app stores. We do not knowingly collect
          anything from anyone under 18. If you believe someone under 18 has used the app, write to
          us and we will delete whatever we can find.
        </p>

        <h2>4. No account, no sign-in</h2>
        <p>
          There is no account. We never ask for your name, email address, phone number, date of
          birth, location, contacts, photos, microphone or camera, and the app requests none of
          those permissions. We do not use an advertising identifier and we do not build a profile
          of you. We do not track you across other apps or websites, and the app contains no
          advertising or tracking software from anyone.
        </p>

        <h2>5. What we collect, where it goes, and how long it stays</h2>
        <p>
          The short version: what you type is processed to give you feedback and is not stored by
          us. A small set of structured learning records can be kept on your own phone if you turn
          history on. We keep ordinary operational records about the service and counts of how it
          is used. The details follow.
        </p>

        <h3>5.1 What you write in Practice, Custom scenario and Debrief</h3>
        <p>
          When you practise or debrief, the text you write, the scenario and the conversation so
          far are sent over an encrypted connection to our server so the AI model can grade your
          reply and answer as the practice partner. Our server keeps the conversation in memory
          only for the length of the session, and deletes it when you finish or one hour after it
          started, whichever comes first. It is not written to a database or a file. Our own logs
          record which tool you used, how much text was processed, what it cost us, and which
          safety route (if any) applied. They never contain what you wrote or what the model said.
          To stop any one installation or automated script from overloading the service, the app
          sends a random token it made up on first launch with each request; the server counts how
          many sessions each token starts per day, and how many are started from each network
          address, and forgets both counts at midnight UTC. The token is tied to nothing about you,
          is never logged, and is replaced when you use &ldquo;Delete everything&rdquo;.
        </p>
        <p>
          Spiral, the in-the-moment routine, sends nothing anywhere. It works with no connection,
          uses no AI model and records nothing. The only thing counted is the tap on the home
          screen that opens it, under section 5.4, if usage counts are on.
        </p>

        <h3>5.2 The AI provider</h3>
        <p>
          The AI model is run by Anthropic, PBC, in the United States, under its commercial API
          terms, acting as our service provider. We send the scenario, the conversation so far and
          your reply; the provider returns the grade, the lesson and the partner&rsquo;s next line.
          We send nothing that identifies you: no name, no account, no device identifier.
        </p>
        <p>
          Under Anthropic&rsquo;s commercial terms, inputs and outputs are not used to train its
          models. Anthropic may retain inputs and outputs for up to 30 days for abuse and misuse
          monitoring and then deletes them, and may retain content flagged by its automated safety
          systems for longer, up to two years. If we obtain a zero-data-retention arrangement for
          the app, we will update this policy to say so.
        </p>

        <h3>5.3 Learning records on your phone (optional, off by default)</h3>
        <p>
          If you turn on &ldquo;Save practice history&rdquo; in Settings, the app keeps a short
          structured record after each practice session and after each debrief whose pattern you
          choose to save: the date, the skill practised (for a scenario you described yourself, a
          short label the model wrote for it, never your words), the scenario type and whether it
          was canned or your own, the name of the pattern noticed (for example
          &ldquo;Defensiveness&rdquo;), the score band (for example &ldquo;Solid&rdquo;), whether a
          retry improved, whether you gave ground under pressure, and the practice partner&rsquo;s
          mood before and after. It never includes what you wrote, what the partner said, or any
          stronger version suggested to you. Whether or not history is on, the app also keeps on
          your phone: your onboarding answers, your settings, your last Spiral heat check, the hour
          you chose for the optional daily reminder, the score bands of your last six replies (used
          only to offer an easier level), your daily-rep run and count, the dates you tapped
          &ldquo;showed up in real life&rdquo;, the free-tier counters, whether Plus is active, and
          the random install token described in 5.1. None of these contain text.
        </p>
        <p>
          These records live only on your phone, in the app&rsquo;s private storage. They are not
          sent to us and we cannot see them. They are deleted automatically after 12 months, the
          app reminds you a month before, and you can delete all of them at any time from Settings
          or the Progress screen. Deleting the app deletes them too.
        </p>

        <h3>5.4 Usage counts</h3>
        <p>
          To know whether the app is used and which tools people reach for, the app sends our
          server simple event counts. There are six: a practice session started, a practice session
          finished, Spiral opened, Debrief used, the Plus screen seen, and a purchase completed.
          Each event carries only its name. There is no user, device or install identifier, and the
          counts are added up per hour on arrival; the individual events are not kept. The hourly
          totals are written to our server log, which our hosting provider keeps for a short
          period, which we understand to be no more than 30 days, and which we may copy into our
          own records as totals. You can switch usage counts off in Settings.
        </p>

        <h3>5.5 Crash and error reports</h3>
        <p>
          If the app or the server crashes, a report may be sent to us containing the error type
          and message, the stack trace, the app version, the operating system version and the
          device model. Reports are built so that they cannot include anything you typed, anything
          the model returned, or request and response bodies. They carry no user or device
          identifier and we do not store your IP address with them. A crash report is one line in
          our server log, kept as long as our hosting provider keeps the log, which we understand
          to be no more than 30 days.
        </p>

        <h3>5.6 Server and connection records</h3>
        <p>
          Any request to our server exposes your IP address and the request&rsquo;s time, path and
          size. Our hosting provider, Fly.io, Inc., records these at its edge and keeps them for a
          short period, which we understand to be no more than 30 days, for security and
          operations. We do not combine them with anything else and we do not use them to identify
          you.
        </p>

        <h3>5.7 App updates</h3>
        <p>
          When the app launches, it checks for a newer version of its code with Expo&rsquo;s update
          service (Expo, Inc., United States). That request carries the app&rsquo;s runtime
          version, platform and update channel; Expo sees your IP address as part of serving it. No
          app data and nothing you wrote is included.
        </p>

        <h3>5.8 Purchases</h3>
        <p>
          If you buy a Plus subscription, the purchase is handled by Apple (App Store) or Google
          (Google Play). We never see your card or bank details. Our subscription management
          service, RevenueCat, Inc. (United States), receives an anonymous app user identifier it
          generates and the purchase events, such as a trial starting or a renewal, so the app can
          unlock what you paid for on any of your devices and we can account for sales. That
          identifier is not linked to your name, your Apple or Google account, or anything you do
          inside the app. These records are kept as long as the law on bookkeeping requires, and
          are not linked to anything you do inside the app.
        </p>

        <h3>5.9 Support and correspondence</h3>
        <p>
          If you write to us, we keep your message and our reply for up to 24 months so we can help
          you and answer follow-up questions. We use your email address only to reply.
        </p>

        <h3>5.10 Website</h3>
        <p>
          The product pages at aetherpractice.com are covered by the{" "}
          <Link href="/privacy">Aether Practice website privacy policy</Link> for things like page
          analytics and cookies. The app itself sets no cookies.
        </p>

        <h2>6. Why we are allowed to do this</h2>
        <p>
          For users in the European Economic Area, the United Kingdom, Norway and Switzerland, the
          legal bases are: performance of the service you asked for (5.1, 5.2, 5.7, 5.8); our
          legitimate interests in running a secure, working service and understanding how it is
          used (5.4, 5.5, 5.6, 5.9); legal obligation (bookkeeping in 5.8); and your consent
          (5.3, which stays on your phone). Where we rely on consent, you can withdraw it in
          Settings at any time, and withdrawing it does not affect what was done before. Anthropic,
          Fly.io, Expo and RevenueCat are in the United States; transfers to them rest on the EU
          Standard Contractual Clauses or on the EU-US Data Privacy Framework where the provider is
          certified.
        </p>

        <h2>7. Sharing</h2>
        <p>
          We share data only with the service providers named in this policy, each acting on our
          instructions to run the app: Anthropic (AI model), Fly.io (hosting), Expo (app updates),
          Apple and Google (app distribution and purchases), and RevenueCat (subscription
          management). We do not sell personal information and we do not share it for
          cross-context behavioural advertising. We will disclose information if the law requires
          it, or to protect someone&rsquo;s safety, and only what is required.
        </p>

        <h2>8. Your choices and rights</h2>
        <ul>
          <li>
            <strong>Save practice history:</strong> off by default, in Settings. Delete all of it in
            one tap.
          </li>
          <li>
            <strong>Usage counts:</strong> on by default, can be switched off in Settings.
          </li>
          <li>
            <strong>Daily reminder:</strong> off by default; the notification uses fixed, neutral
            wording and never mentions a partner or a conflict.
          </li>
          <li>
            <strong>Delete the app:</strong> removes everything held on your phone.
          </li>
        </ul>
        <p>
          Depending on where you live, you may have the right to know what personal information we
          hold about you, to receive a copy, to correct it, to delete it, to restrict or object to
          its use, to data portability, and not to be treated differently for exercising these
          rights. You may also complain to a supervisory authority; in Norway that is Datatilsynet.
          Write to <Email /> to exercise any right. Because the app has no account and we hold no
          identifier for you, the honest answer to most requests is that nothing we hold can be
          matched to you, and the data that exists is on your phone under your control. Where we do
          hold something that can be matched (for example a support email), we will act on your
          request within the time the law allows, usually 30 days, and we may ask you to confirm
          you sent it from the address in question.
        </p>

        <h2>9. US state privacy notice</h2>
        <p>
          This section is for residents of US states with consumer privacy laws, including
          California, Colorado, Connecticut, Virginia and others. In the past 12 months we have
          collected the categories described in section 5: user content processed transiently
          (5.1), usage and diagnostic information (5.4, 5.5), network identifiers held by our host
          (5.6), purchase records (5.8) and correspondence (5.9). The sources are you and
          your device. The purposes are those stated in each subsection. We disclose these
          categories only to the service providers in section 7. We do not sell personal
          information, we do not share it for cross-context behavioural advertising, we do not use
          it for targeted advertising, and we do not use sensitive personal information to infer
          characteristics about you. We have not sold or shared personal information in the past 12
          months. There is no &ldquo;Do Not Sell or Share&rdquo; setting because there is nothing
          to opt out of. We do not knowingly collect information from anyone under 16.
        </p>
        <p>
          <strong>Consumer health data.</strong> Some states, including Washington, Nevada and
          Connecticut, give special protection to information that could identify a person&rsquo;s
          health status, including their mental health. The app is not a health service and does
          not assess or record your health. The only data that could fall under those laws is what
          you choose to write in a practice session, which is processed as described in 5.1 and 5.2
          and is not kept by us. We do not share consumer health data with anyone other than the
          service providers named here, we do not sell it, and we do not use geofencing. To
          exercise rights under those laws, write to <Email />. If we deny a request, you may
          appeal by replying to our answer, and we will respond to the appeal in writing within 45
          days.
        </p>

        <h2>10. Security</h2>
        <p>
          Connections between the app and our server, and between our server and the AI provider,
          are encrypted with TLS. Our server holds no database and writes nothing you type to disk.
          On your phone, saved records sit in the app&rsquo;s private storage, protected by your
          device&rsquo;s own lock and encryption. No system is perfectly secure. If we learn of a
          breach that affects you, we will tell you as the law requires, through the app or the
          product page since we have no other way to reach you.
        </p>

        <h2>11. Changes to this policy</h2>
        <p>
          If we change what the app collects, we will change this policy first and update the
          effective date. Where a change means collecting more than before, the app will ask for
          your consent in Settings rather than assume it. The current version is always at{" "}
          <Link href="/instruments/conflict/privacy">
            aetherpractice.com/instruments/conflict/privacy
          </Link>
          .
        </p>

        <h2>12. Contact</h2>
        <p>
          Aether Practice
          <br />
          <Email />
          <br />
          <Link href="/instruments/conflict/support">
            aetherpractice.com/instruments/conflict/support
          </Link>
        </p>
      </div>

      <div className="mt-16 font-[Roboto,Arial,sans-serif] text-sm text-[#93857B]">
        <Link href="/instruments/conflict" className="transition-colors hover:text-[#A3968C]">
          ← AET01 Conflict
        </Link>
      </div>
    </div>
  )
}
