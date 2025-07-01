import { useState } from 'react'
import Button from './Button'
import Card, { CardHeader, CardBody, CardFooter } from './Card'
import Input, { Textarea } from './Input'
import Badge from './Badge'
import Alert from './Alert'

export default function Styleguide() {
  const [count, setCount] = useState(0)
  const [showAlert, setShowAlert] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-outline-variant">
        <div className="max-w-5xl mx-auto px-8 py-16">
          <h1 className="text-display-medium text-on-surface mb-4">
            Design System
          </h1>
          <p className="text-body-large text-on-surface-variant max-w-2xl">
            A collection of reusable components built with precision and purpose, following Material Design 3 principles.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-8">
        
        {/* Typography */}
        <section className="py-24">
          <div className="mb-16">
            <h2 className="text-headline-medium text-on-surface mb-3">Typography</h2>
            <div className="w-12 h-px bg-primary"></div>
          </div>
          
          <div className="grid gap-8">
            <div className="space-y-6">
              <h1 className="text-display-large text-on-surface">Display Large</h1>
              <h2 className="text-display-medium text-on-surface">Display Medium</h2>
              <h3 className="text-display-small text-on-surface">Display Small</h3>
              <h4 className="text-headline-large text-on-surface">Headline Large</h4>
              <h5 className="text-headline-medium text-on-surface">Headline Medium</h5>
              <h6 className="text-headline-small text-on-surface">Headline Small</h6>
              <div className="text-title-large text-on-surface">Title Large</div>
              <div className="text-title-medium text-on-surface">Title Medium</div>
              <div className="text-title-small text-on-surface">Title Small</div>
              <p className="text-body-large text-on-surface max-w-3xl">
                Body Large: This is the main body text style. It should be readable and comfortable for extended reading. The typeface is designed for clarity and should never compete with headings for attention.
              </p>
              <p className="text-body-medium text-on-surface-variant max-w-3xl">
                Body Medium: Used for shorter text blocks and secondary content. Provides good readability while maintaining hierarchy.
              </p>
              <p className="text-body-small text-on-surface-variant">
                Body Small: For captions, supporting information, and metadata.
              </p>
              <div className="text-label-large text-on-surface">Label Large</div>
              <div className="text-label-medium text-on-surface-variant">Label Medium</div>
              <div className="text-label-small text-on-surface-variant">Label Small</div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="py-24 border-t border-outline-variant">
          <div className="mb-16">
            <h2 className="text-headline-medium text-on-surface mb-3">Buttons</h2>
            <div className="w-12 h-px bg-primary"></div>
          </div>
          
          <div className="space-y-12">
            <div className="grid gap-6">
              <h3 className="text-label-large text-on-surface-variant uppercase tracking-wider">Button Styles</h3>
              <div className="flex items-center gap-6">
                <Button variant="glow" size="medium">Interactive Glow</Button>
                <Button variant="ghost" size="medium">Ghost Button</Button>
              </div>
            </div>

            <div className="grid gap-6">
              <h3 className="text-label-large text-on-surface-variant uppercase tracking-wider">Interactive Example</h3>
              <div className="flex items-center gap-4">
                <Button onClick={() => setCount(count + 1)} variant="glow">
                  Count: {count}
                </Button>
                <Button disabled variant="ghost">Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Form Elements */}
        <section className="py-24 border-t border-outline-variant">
          <div className="mb-16">
            <h2 className="text-headline-medium text-on-surface mb-3">Form Elements</h2>
            <div className="w-12 h-px bg-primary"></div>
          </div>
          
          <div className="space-y-16">

            {/* Gradient Forms */}
            <div className="max-w-2xl space-y-8">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider">Gradient Forms</h3>
              <div className="bg-black rounded-2xl p-8 space-y-6">
                <Input 
                  variant="gradient"
                  placeholder="Enter your email"
                  type="email"
                  fullWidth
                />
                <Input 
                  variant="gradient"
                  placeholder="Enter your full name"
                  fullWidth
                />
                <Input 
                  variant="gradient"
                  placeholder="Enter phone number"
                  fullWidth
                />
                <Textarea 
                  variant="gradient"
                  placeholder="Write your message here..."
                  rows={4}
                  fullWidth
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
                Premium gradient form elements with backdrop blur effects and smooth animations, 
                matching the aesthetic of the gradient cards.
              </p>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="py-24 border-t border-outline-variant">
          <div className="mb-16">
            <h2 className="text-headline-medium text-on-surface mb-3">Cards</h2>
            <div className="w-12 h-px bg-primary"></div>
          </div>
          
          <div className="space-y-16">
            {/* Main Cards */}
            <div className="space-y-8">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider">Main Card</h3>
              <div className="bg-black rounded-2xl p-8 flex justify-center">
                <div className="flex flex-col items-center space-y-4">
                  <Card variant="gradient" />
                  <p className="text-xs text-gray-400 text-center">Premium 3D Interactive</p>
                </div>
              </div>
            </div>

            {/* Child Cards */}
            <div className="space-y-8">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider">Child Card</h3>
              <div className="bg-black rounded-2xl p-8 flex justify-center">
                <div className="flex flex-col items-center space-y-4">
                  <Card variant="gradient" minimal={true} showIcon={false} />
                  <p className="text-xs text-gray-400 text-center">Minimal Flat Design</p>
                </div>
              </div>
            </div>


          </div>
        </section>

        {/* Status Indicators */}
        <section className="py-24 border-t border-outline-variant">
          <div className="mb-16">
            <h2 className="text-headline-medium text-on-surface mb-3">Status Indicators</h2>
            <div className="w-12 h-px bg-primary"></div>
          </div>
          
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider">Badges</h3>
              <div className="flex items-center gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Active</Badge>
                <Badge variant="success">Completed</Badge>
                <Badge variant="warning">Pending</Badge>
                <Badge variant="danger">Error</Badge>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider">Alerts</h3>
              <div className="space-y-4 max-w-2xl">
                <Alert variant="success" title="Success">
                  Your changes have been saved successfully.
                </Alert>
                <Alert variant="warning" title="Warning">
                  Please review the information before proceeding.
                </Alert>
                {showAlert && (
                  <Alert 
                    variant="info" 
                    closable 
                    onClose={() => setShowAlert(false)}
                  >
                    This notification can be dismissed.
                  </Alert>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Material Design 3 Color System */}
        <section className="py-24 border-t border-outline-variant">
          <div className="mb-16">
            <h2 className="text-headline-medium text-on-surface mb-3">Material Design 3 Color System</h2>
            <div className="w-12 h-px bg-primary"></div>
          </div>
          
          <div className="space-y-12">
            {/* Primary Tonal Palette */}
            <div className="space-y-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider">Primary Tonal Palette (Dark Olive Green)</h3>
              <div className="grid grid-cols-6 lg:grid-cols-13 gap-2 max-w-6xl">
                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 100].map(tone => (
                  <div key={tone} className="space-y-2">
                    <div 
                      className="aspect-square rounded border border-outline-variant"
                      style={{ backgroundColor: `var(--md-primary-${tone})` }}
                    ></div>
                    <div className="text-xs text-center text-on-surface-variant">
                      <div className="font-medium">{tone}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Tonal Palette */}
            <div className="space-y-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider">Secondary Tonal Palette</h3>
              <div className="grid grid-cols-6 lg:grid-cols-13 gap-2 max-w-6xl">
                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 100].map(tone => (
                  <div key={tone} className="space-y-2">
                    <div 
                      className="aspect-square rounded border border-outline-variant"
                      style={{ backgroundColor: `var(--md-secondary-${tone})` }}
                    ></div>
                    <div className="text-xs text-center text-on-surface-variant">
                      <div className="font-medium">{tone}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tertiary Tonal Palette */}
            <div className="space-y-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider">Tertiary Tonal Palette</h3>
              <div className="grid grid-cols-6 lg:grid-cols-13 gap-2 max-w-6xl">
                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 98, 100].map(tone => (
                  <div key={tone} className="space-y-2">
                    <div 
                      className="aspect-square rounded border border-outline-variant"
                      style={{ backgroundColor: `var(--md-tertiary-${tone})` }}
                    ></div>
                    <div className="text-xs text-center text-on-surface-variant">
                      <div className="font-medium">{tone}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Surface Elevation System */}
            <div className="space-y-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider">Surface Elevation System</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl">
                {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map(level => (
                  <div key={level} className="space-y-3">
                    <div 
                      className={`aspect-square rounded-lg border border-outline-variant surface-${level === 0 ? '0' : level} elevation-${level === 0 ? '1' : Math.min(level, 24)}`}
                    ></div>
                    <div className="text-xs text-center text-on-surface-variant">
                      <div className="font-medium">Surface {level}dp</div>
                      <div className="font-mono text-xs opacity-75">
                        {level === 0 ? '#121212' : 
                         level === 1 ? '#1D1D1D' :
                         level === 2 ? '#212121' :
                         level === 3 ? '#242424' :
                         level === 4 ? '#272727' :
                         level === 6 ? '#2C2C2C' :
                         level === 8 ? '#2F2F2F' :
                         level === 12 ? '#333333' :
                         level === 16 ? '#363636' : '#383838'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Roles Demonstration */}
            <div className="space-y-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider">Color Roles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
                <div className="bg-primary p-6 rounded-lg">
                  <div className="text-on-primary font-medium mb-2">Primary</div>
                  <div className="text-on-primary text-sm opacity-90">#97A75F</div>
                </div>
                <div className="bg-secondary p-6 rounded-lg">
                  <div className="text-on-secondary font-medium mb-2">Secondary</div>
                  <div className="text-on-secondary text-sm opacity-90">#C8C278</div>
                </div>
                <div className="bg-tertiary p-6 rounded-lg">
                  <div className="text-on-tertiary font-medium mb-2">Tertiary</div>
                  <div className="text-on-tertiary text-sm opacity-90">#A7CA65</div>
                </div>
                <div className="bg-surface-variant p-6 rounded-lg border border-outline-variant">
                  <div className="text-on-surface-variant font-medium mb-2">Surface Variant</div>
                  <div className="text-on-surface-variant text-sm opacity-90">#30332B</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-24 border-t border-outline-variant">
          <div className="text-center">
            <p className="text-body-small text-on-surface-variant">
              Design System — Built with precision and purpose following Material Design 3
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}