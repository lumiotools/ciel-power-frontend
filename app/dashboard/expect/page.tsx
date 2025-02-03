import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  ClipboardList,
  Home,
  Shield,
  Settings2,
  FileText,
  PawPrint,
  Upload,
  Users,
} from "lucide-react";

const HomePage: FC = () => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          What to Expect During Your Home Energy Audit
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Thank you for scheduling your Home Energy Audit
        </p>
        <Alert className="bg-lime-200 border-lime-400 mb-8">
          <AlertDescription>
            This important first step is a prerequisite for participating in the
            Whole House Energy Efficiency Programs available through New
            Jersey&apos;s regional utility companies. These programs provide
            access to valuable incentives and financing options for
            energy-efficient home upgrades.
          </AlertDescription>
        </Alert>

        {/* YouTube Video Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Discover the Power of Energy Efficiency with a Ciel Home Energy
            Audit
          </h2>
          <div className="aspect-video">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/FH0hdanGxkM"
              title="Energy Audit Overview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* What Happens During the Audit */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">
          What Happens During the Audit
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ClipboardList className="h-6 w-6 text-lime-500" />
                <CardTitle>1. On-Site Inspection</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                A certified auditor, accredited by the Building Performance
                Institute (BPI), will visit your home to assess its energy
                performance.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 mt-2 rounded-full bg-lime-500" />
                  <span>
                    Gathering information about insulation, construction
                    details, and your heating, cooling, and hot water systems
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 mt-2 rounded-full bg-lime-500" />
                  <span>
                    Performing a blower door test to measure air tightness and
                    using infrared cameras to identify areas where air may be
                    leaking
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 mt-2 rounded-full bg-lime-500" />
                  <span>
                    Conducting safety checks for issues such as gas leaks,
                    carbon monoxide, mold, and asbestos
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings2 className="h-6 w-6 text-lime-500" />
                <CardTitle>2. Engineering Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                After the inspection, the data collected will be used to create
                a virtual model of your home.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 mt-2 rounded-full bg-lime-500" />
                  <span>
                    Projects energy savings from recommended improvements
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-2 w-2 mt-2 rounded-full bg-lime-500" />
                  <span>
                    Identifies utility incentives and tax credits available to
                    you (up to 30% of costs)
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Final Report Section */}
      <Card className="mb-12">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-lime-500" />
            <CardTitle>Your Final Report</CardTitle>
          </div>
          <CardDescription>
            Within a few days of the visit, you will receive a detailed report
            including:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="h-2 w-2 mt-2 rounded-full bg-lime-500" />
              <span>
                A breakdown of your home&apos;s current energy performance
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-2 w-2 mt-2 rounded-full bg-lime-500" />
              <span>
                A prioritized list of suggested upgrades, including costs,
                incentives, and estimated savings
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="h-2 w-2 mt-2 rounded-full bg-lime-500" />
              <span>
                Steps you can take to enhance your home&apos;s comfort and
                efficiency
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* How to Prepare Section */}
      <Card className="mb-12">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-lime-500" />
            <CardTitle>How to Prepare</CardTitle>
          </div>
          <CardDescription>
            Here are a few steps to help the audit go smoothly:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Home className="h-5 w-5 text-lime-500" />
                  <h3 className="font-semibold">1. Provide Access</h3>
                </div>
                <p>
                  Ensure key areas of your home are accessible for inspection:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Attic</li>
                  <li>Basement</li>
                  <li>Crawl spaces</li>
                  <li>Mechanical rooms</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <PawPrint className="h-5 w-5 text-lime-500" />
                  <h3 className="font-semibold">2. Secure Pets</h3>
                </div>
                <p>
                  If you have pets, consider keeping them confined in a safe
                  space during the audit to ensure the technician can work
                  without interruptions.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Upload className="h-5 w-5 text-lime-500" />
                  <h3 className="font-semibold">3. Utility Information</h3>
                </div>
                <p>
                  Please upload your most recent gas and electric utility bills
                  through the portal before your audit. This information is
                  essential for generating your audit report and identifying
                  available incentives and savings opportunities.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-lime-500" />
                  <h3 className="font-semibold">
                    4. Plan for Someone to Be Home
                  </h3>
                </div>
                <p>
                  It&apos;s helpful for someone to be present to provide access
                  and discuss any concerns or observations about your home.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="mb-12">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-lime-500" />
            <CardTitle>Frequently Asked Questions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="duration">
              <AccordionTrigger>How long does the audit take?</AccordionTrigger>
              <AccordionContent>
                The on-site portion typically takes 2 to 4 hours, depending on
                the size of your home.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="safety">
              <AccordionTrigger>
                What happens if safety issues are found during the audit?
              </AccordionTrigger>
              <AccordionContent>
                If a safety issue, such as a gas leak, is identified during the
                audit, we will immediately notify the utility company to ensure
                your safety. Other concerns, like mold or asbestos, will be
                detailed in the report and may need to be addressed before
                completing energy efficiency improvements.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="stay-home">
              <AccordionTrigger>
                Can I stay at home while the audit is being conducted?
              </AccordionTrigger>
              <AccordionContent>
                Yes. You and your family are welcome to remain in your home
                during the audit.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="work-home">
              <AccordionTrigger>
                Can I work from home during the audit?
              </AccordionTrigger>
              <AccordionContent>
                Yes. Our technicians can work independently, or you are welcome
                to join them as they assess your home&apos;s energy performance.
                If you are working remotely or attending virtual meetings,
                please note that the blower door test may cause fan noise and
                brief changes in temperature in your home.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="share">
              <AccordionTrigger>
                Can I share this service with others?
              </AccordionTrigger>
              <AccordionContent>
                Yes. If you know someone who could benefit from an audit, please
                share this information or refer them to Ciel Power.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Footer Section */}
      <Separator className="my-8" />
      <div className="text-center mt-8">
        <p className="text-muted-foreground">
          Thank you for choosing Ciel Power. We look forward to helping you
          create a more comfortable and energy-efficient home. If you have any
          questions, don&apos;t hesitate to reach out.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
