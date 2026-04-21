import Link from "next/link";

const RefundServiceContent = () => {
  return (
    <div>
      <h1>Refund Policy</h1>
      <p>
        <strong>Last Updated: April 17, 2026</strong>
      </p>
      <p>
        This Refund Policy applies to all transactions made through NetProxy.io
        (&quot;NetProxy.io,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
        related to the use of our services (&quot;Services&quot;).
      </p>

      <h2>1. No Refunds Under Any Circumstances</h2>
      <p>
        We have a strict <strong>no-refund policy</strong> for any reason,
        including but not limited to:
      </p>
      <ul>
        <li>
          <p>Dissatisfaction with the service quality</p>
        </li>
        <li>
          <p>Change of mind after purchase</p>
        </li>
        <li>
          <p>
            Technical issues, service interruptions, or modifications to
            features
          </p>
        </li>
        <li>
          <p>
            Violations of our Terms of Service or other policies resulting
            in the suspension or termination of Services
          </p>
        </li>
      </ul>

      <h2>2. Trial Before Payment</h2>
      <p>
        To ensure that you are confident in our Services before committing
        to a payment, we strongly recommend:
      </p>
      <ul>
        <li>
          <p>
            <strong>Purchasing a smaller package first</strong> to evaluate
            the Services on a limited scale before upgrading to a larger
            plan.
          </p>
        </li>
        <li>
          <p>
            <strong>Contacting us</strong> if you would like to discuss a
            trial or have any questions before making a purchase.
          </p>
        </li>
      </ul>

      <h2>3. No Pro-Rated Refunds</h2>
      <p>
        We do not provide pro-rated refunds or credits for any unused or
        remaining subscription periods.
      </p>

      <h2>4. Legal Compliance</h2>
      <p>
        In certain jurisdictions, mandatory consumer protection laws may
        provide rights that cannot be waived or limited by this Refund
        Policy. In such cases, we will comply with all applicable legal
        requirements.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Refund Policy,
        please contact us at:
      </p>
      <p>
        <strong>NetProxy.io Billing Department</strong>
        <br />
        Website: <Link href="/">https://netproxy.io</Link>
      </p>
      <p>© 2026 NetProxy.io. All rights reserved.</p>
      <p>
        <br />
        <br />
        <br />
      </p>
    </div>
  );
};
export default RefundServiceContent;
