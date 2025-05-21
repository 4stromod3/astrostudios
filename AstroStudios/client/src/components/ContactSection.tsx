import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { z } from "zod";
import { insertContactMessageSchema, insertNewsletterSubscriptionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Extend the insertContactMessageSchema with validation
const contactFormSchema = insertContactMessageSchema.extend({
  email: z.string().email({ message: "Invalid email address" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  // Contact form setup
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "general",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (values: ContactFormValues) => {
      return apiRequest("POST", "/api/contact", values);
    },
    onSuccess: () => {
      toast({
        title: t('contact.success.title'),
        description: t('contact.success.message'),
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: t('contact.error.title'),
        description: t('contact.error.message'),
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    },
  });

  const newsletterMutation = useMutation({
    mutationFn: (email: string) => {
      return apiRequest("POST", "/api/newsletter", { email });
    },
    onSuccess: () => {
      toast({
        title: t('newsletter.success.title'),
        description: t('newsletter.success.message'),
      });
      setNewsletterEmail("");
    },
    onError: (error) => {
      toast({
        title: t('newsletter.error.title'),
        description: t('newsletter.error.message'),
        variant: "destructive",
      });
      console.error("Newsletter subscription error:", error);
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    contactMutation.mutate(values);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      insertNewsletterSubscriptionSchema.parse({ email: newsletterEmail });
      newsletterMutation.mutate(newsletterEmail);
    } catch (error) {
      toast({
        title: t('newsletter.error.title'),
        description: t('newsletter.error.validation'),
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{t('contact.title')}</h2>
          <p className="text-lg text-gray-700">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.name')}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.email')}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.subject')}</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors">
                            <SelectValue placeholder={t('contact.form.selectSubject')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="general">{t('contact.form.subjects.general')}</SelectItem>
                          <SelectItem value="support">{t('contact.form.subjects.support')}</SelectItem>
                          <SelectItem value="business">{t('contact.form.subjects.business')}</SelectItem>
                          <SelectItem value="press">{t('contact.form.subjects.press')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.message')}</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={5} 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full px-6 py-3 bg-secondary hover:bg-secondary/90 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? t('contact.form.sending') : t('contact.form.send')}
                </Button>
              </form>
            </Form>
          </motion.div>

          <motion.div 
            className="space-y-8 lg:pl-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h3 className="text-xl font-heading font-bold mb-4">{t('contact.connect.title')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-neutral rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <i className="fab fa-twitter text-2xl text-gray-700"></i>
                  <span className="font-medium">X (Twitter)</span>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-neutral rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <i className="fab fa-youtube text-2xl text-gray-700"></i>
                  <span className="font-medium">YouTube</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-neutral rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <i className="fab fa-instagram text-2xl text-gray-700"></i>
                  <span className="font-medium">Instagram</span>
                </a>
                <a 
                  href="https://bsky.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-neutral rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <i className="fas fa-cloud text-2xl text-gray-700"></i>
                  <span className="font-medium">Bluesky</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-heading font-bold mb-4">{t('contact.faq.title')}</h3>
              <p className="text-gray-700 mb-4">{t('contact.faq.description')}</p>
              <a href="#" className="inline-flex items-center text-secondary hover:text-accent transition-colors font-medium">
                {t('contact.faq.link')} <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>

            <div className="bg-neutral p-6 rounded-xl">
              <h3 className="text-xl font-heading font-bold mb-4">{t('newsletter.title')}</h3>
              <p className="text-gray-700 mb-4">{t('newsletter.description')}</p>
              <form className="flex" onSubmit={handleNewsletterSubmit}>
                <Input
                  type="email"
                  placeholder={t('newsletter.placeholder')}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
                  required
                />
                <Button
                  type="submit"
                  className="px-4 py-2 bg-secondary hover:bg-secondary/90 text-white font-medium rounded-r-lg transition-colors"
                  disabled={newsletterMutation.isPending}
                >
                  {newsletterMutation.isPending ? t('newsletter.subscribing') : t('newsletter.subscribe')}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
